import {
  Body,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import axios from 'axios';
import * as qs from 'qs';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { TraccarService } from 'src/device/device.service';

@Injectable()
export class AuthService {
  private readonly traccarApiUrl = process.env.My_Ip;
  private readonly traccarApiToken = process.env.My_Token;
  private userSecrets = new Map<string, string>();

  constructor(
  @InjectRepository(Login) private loginRepository: Repository<Login>,
  private jwtService: JwtService,
  @Inject(forwardRef(() => TraccarService))
  private readonly TraccarService: TraccarService,
) {}


  authHeader(username: string, password: string): string {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return authHeader;
  }

  async generate2FA(username: string) {
    
    const user = await this.loginRepository.findOneBy({ NameUser: username });
    console.log("HOLAAAA");
    console.log(user);
    

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.firstSecret) {
      return { message: '2FA ya configurado previamente' };
    }

    const secret = speakeasy.generateSecret({
      name: `NetoTrack:${username}`,
    });

    user.authenticatorSecret = secret.base32;
    user.firstSecret = false;

    await this.loginRepository.save(user); // Guarda el secreto y marca como ya generado

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    return {
      qrCodeDataURL,
      secret: secret.base32,
      message: '2FA generado exitosamente',
    };
  }

  async get2FAQrFromDB(username: string) {
    const user = await this.loginRepository.findOneBy({ NameUser: username });

    if (!user || !user.authenticatorSecret) {
      throw new HttpException(
        'El usuario no tiene 2FA configurado',
        HttpStatus.NOT_FOUND,
      );
    }

    const otpauthUrl = speakeasy.otpauthURL({
      secret: user.authenticatorSecret,
      label: `NetoTrack:${username}`,
      encoding: 'base32',
    });

    const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);

    return {
      qrCodeDataURL,
      secret: user.authenticatorSecret,
      message: 'QR generado desde el secreto guardado',
    };
  }

  async verify2FACode(
    username: string,
    password: string,
    token: string,
  ): Promise<boolean> {
    console.log("holaa");
    
    const user = await this.loginRepository.findOneBy({ emailUser: username });

    console.log('🔍 Buscando usuario:', username);
    console.log('📦 Resultado:', user);

    if (!user || !user.authenticatorSecret) {
      console.log('❌ Usuario no encontrado o sin 2FA configurado');
      throw new UnauthorizedException('2FA no configurado');
    }

    const verified = speakeasy.totp.verify({
      secret: user.authenticatorSecret,
      encoding: 'base32',
      token,
      window: 0,
    });

    console.log('🔐 Código recibido:', token);
    console.log('🔐 Secreto:', user.authenticatorSecret);
    console.log('✅ Verificación:', verified);

    if (!verified) {
      throw new UnauthorizedException('Código 2FA inválido');
    }

    // Solo si el código fue correcto
    if (username === 'netotrackmonitor01@gmail.com') {
      try {
        const authHeader = this.authHeader(username, password);
        console.log("holaaaa");
        const devices = await this.TraccarService.foundAllDevice(authHeader);
        
        const permissionUrl = `${this.traccarApiUrl}/permissions`;

        // Usa Promise.all para asignar en paralelo (más rápido)
        await Promise.all(
          devices.map(async (device) => {
            try {
              await axios.post(
                permissionUrl,
                {
                  userId: 118,
                  deviceId: device.id,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader,
                  },
                },
              );

              console.log(`✅ Permiso asignado: ${device.name} → usuario 118`);
            } catch (err) {
              console.error(
                `❌ Error al asignar ${device.name}:`,
                err.response?.data || err.message,
              );
            }
          }),
        );

        console.log('📡 Dispositivos procesados:', devices.length);
        return true;
      } catch (err) {
        console.error('⚠️ Error en asignación de permisos:', err.message);
        throw new HttpException(
          'Fallo en la asignación de permisos tras 2FA',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return true;
  }

  async createUser(data: Partial<Login>) {
    const user = this.loginRepository.create(data);
    return await this.loginRepository.save(user);
  }

  async validateAdmin(username: string) {
    if (!username) {
      throw new UnauthorizedException('Username is required');
    }

    try {
      const response = await axios.get(`${this.traccarApiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${this.traccarApiToken}`,
          'Content-Type': 'application/json',
        },
      });

      const users = response.data;
      const user = users.find((u: any) => u.name === username);

      if (!user || !user.administrator) {
        throw new UnauthorizedException(
          'User not found or not an administrator',
        );
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Error validating administrator');
    }
  }

  private async sendPasswordResetEmail(email: string, token: string) {
    // Configuración de SMTP para Office 365
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Host de Office 365
      port: 587, // Puerto para STARTTLS
      secure: false, // Usar STARTTLS (no SSL/TLS directamente)
      requireTLS: true, // Forzar el uso de TLS
      auth: {
        user: process.env.My_Email, // Correo electrónico de Office 365
        pass: process.env.My_Password, // Contraseña del correo
      },
      tls: {
        ciphers: 'SSLv3', // Asegura la compatibilidad con Office 365
        rejectUnauthorized: false, // Solo para desarrollo, no usar en producción
      },
      // Forzar el uso de IPv4
      socketOptions: {
        family: 4, // Usar IPv4
      },
    });

    // Enlace para restablecer la contraseña
    const resetLink = `http://localhost:3001/reset-password/${token}`;

    // Configuración del correo electrónico
    const mailOptions = {
      from: 'info@netotrack.com', // Correo remitente
      to: email, // Correo destinatario
      subject: 'Restablecer contraseña', // Asunto del correo
      text: `Haz clic en el siguiente enlace para cambiar tu contraseña: ${resetLink}`, // Cuerpo del correo (texto plano)
      html: `<p>Haz clic en el siguiente enlace para cambiar tu contraseña: <a href="${resetLink}">${resetLink}</a></p>`, // Cuerpo del correo (HTML)
    };

    try {
      // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  async getAllusers() {
    return await this.loginRepository.find();
  }

  async getOneUser(username: string): Promise<Login> {
    const user = await this.loginRepository.findOneBy({ NameUser: username });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async login(username: string, password: string): Promise<any> {
    
    if (!username || !password) {
      throw new UnauthorizedException('You cannot send empty fields');
    }
    
    try {
      const data = qs.stringify({
        email: username, // Traccar espera el campo "email"
        password: password,
      });
      
      // Autenticar con Traccar usando el endpoint /session
      const response = await axios.post(`${this.traccarApiUrl}/session`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Si la autenticación es exitosa, Traccar devuelve un token y los datos del usuario
      if (response.data && response.data.email) {
        const dataLogin = {
          NameUser: response.data.name,
          passwordUser: password,
          emailUser: username,
        };
        const userExist = await this.loginRepository.findOneBy({
          NameUser: dataLogin.NameUser,
        });
        
        if (userExist) {
          return {
            message: 'Autenticación exitosa',
            user: response.data,
          };
        } else {
          const userLogin = await this.createUser(dataLogin);

          return {
            message: 'Autenticación exitosa',
            user: response.data,
            login: userLogin, // Datos del usuario devueltos por Traccar
          };
        }
      } else {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    } catch (error) {
      console.error(
        'Error al autenticar con Traccar, inserte los datos correctos',
      );
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async changepass(emailUser: string): Promise<any> {
    if (!emailUser) {
      throw new UnauthorizedException('You cannot send empty fields');
    }

    try {
      // Obtener la lista de usuarios desde Traccar
      const usersResponse = await axios.get(`${this.traccarApiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${this.traccarApiToken}`,
        },
      });
      // Buscar el usuario por email en la lista
      const usuario = usersResponse.data.find((u) => u.email === emailUser);
      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Generar un token JWT con el ID del usuario
      const payload = { id: usuario.id };
      const token = this.jwtService.sign(payload, { expiresIn: '1h' });

      // Enviar el correo electrónico con el enlace para cambiar la contraseña
      await this.sendPasswordResetEmail(emailUser, token);

      return {
        message:
          'Se ha enviado un correo con el enlace para cambiar tu contraseña',
        usuario,
      };
    } catch (error) {
      throw new UnauthorizedException('Datos incorrectos');
    }
  }

  async resetPass(token: string, newPassword: string): Promise<any> {
    if (!token || !newPassword) {
      throw new UnauthorizedException(
        'Token y nueva contraseña son requeridos',
      );
    }
    const dataAdmin = {
      email: process.env.My_Traccar_Email,
      password: process.env.My_Traccar_Pass,
    };
    try {
      // Decodificar el token JWT
      const decoded = this.jwtService.verify(token);
      const userId = decoded.id;
      // Obtener la lista de usuarios desde Traccar
      const usersResponse = await axios.get(`${this.traccarApiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${this.traccarApiToken}`,
        },
      });
      // Buscar el usuario por ID en la lista
      const user = usersResponse.data.find((u) => u.id === userId);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado en Traccar');
      }

      // Cambiar la contraseña en Traccar
      const response = await axios.put(
        `${this.traccarApiUrl}/users/${user.id}`,
        {
          id: userId,
          name: user.name,
          email: user.email,
          password: newPassword,
          administrator: user.administrator,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.traccarApiToken}`,
          },
        },
      );

      if (response.status === 200) {
        return { message: 'Contraseña actualizada en Traccar' };
      } else {
        throw new UnauthorizedException(
          'Error al cambiar la contraseña en Traccar',
        );
      }
    } catch (error) {
      console.error(
        'Error en resetPass:',
        error.response ? error.response.data : error.message,
      );
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
