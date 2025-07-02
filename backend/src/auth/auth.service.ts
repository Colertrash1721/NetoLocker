import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as cookie from 'cookie';

/* DTOS IMPORTS AND ENTITIES */
/* ADMIN*/
import { CreateAdminDto } from './dto/create-admin-auth.dto';
import { Admin } from './entities/Admin.entity';
/* COMPANY*/
import { CreateCompany } from './dto/create-company-auth.dto';
import { Company } from './entities/Company.entity';
/*TOKEN */
import { Token } from './entities/Token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) { }

  async findAllAdmin() {
    return await this.adminRepository.find();
  }

  async countAllAdmin() {
    return await this.adminRepository.count();
  }

  async countAllCompanies() {
    return await this.companyRepository.count();
  }

  async allActiveUsers() {
    const adminsOnline = await this.adminRepository.count({
      where: { isOnline: true },
    });

    const companiesOnline = await this.companyRepository.count({
      where: { isOnline: true },
    });

    return adminsOnline + companiesOnline;
  }

  async findAllCompany() {
    return await this.companyRepository.find();
  }

  async findAdminByEmail(email: string) {
    return await this.adminRepository.findOne({ where: { email } });
  }

  async findCompanyByEmail(email: string) {
    return await this.companyRepository.findOne({ where: { email } });
  }

  async findAdminByUsername(username: string) {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async findCompanyByUsername(companyName: string) {
    return await this.companyRepository.findOne({ where: { companyName } });
  }

  async getCompaniesGroupedByMonth() {
    return await this.companyRepository.query(`
    SELECT
    MONTH(creationDate) AS mes_num,
    DATE_FORMAT(creationDate, '%b') AS mes,
    COUNT(*) AS cantidad
    FROM company
    GROUP BY mes_num, mes
    ORDER BY mes_num
  `);
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const user = await this.findAdminByEmail(createAdminDto.email);
    if (user) {
      CreateAdminDto;
      throw new HttpException(
        'Este email ya es usado, si olvido su contraseña contactese con el administrador',
        HttpStatus.FOUND,
      );
    }

    const hash = await bcrypt.hash(createAdminDto.password, 10);
    createAdminDto.password = hash;

    return await this.adminRepository.save(createAdminDto);
  }

  async createCompany(createCompanyDto: CreateCompany) {
    const user = await this.findCompanyByEmail(createCompanyDto.email);
    const admin = await this.findAdminByEmail(createCompanyDto.email)
    if (user || admin) {
      throw new HttpException(
        'Este email ya es usado, si olvido su contraseña contactese con el administrador',
        HttpStatus.FOUND,
      );
    }

    const hash = await bcrypt.hash(createCompanyDto.password, 10);
    createCompanyDto.password = hash;

    if (typeof createCompanyDto.discount !== 'number' || isNaN(createCompanyDto.discount)) {
      createCompanyDto.discount = 0.00;
    }


    return await this.companyRepository.save(createCompanyDto);
  }

  async login(email: string, password: string, res: Response) {
    if (!email || !password) {
      throw new HttpException(
        'No debe dejar campos vacios',
        HttpStatus.BAD_GATEWAY,
      );
    }
    
    try {
      const usersAdmin = await this.findAdminByEmail(email);
      
      
      if (!usersAdmin) {
        const usersCompany = await this.findCompanyByEmail(email);
        if (!usersCompany) {
          throw new HttpException(
            'Usuario no encontrado',
            HttpStatus.NOT_FOUND,
          );
          
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          usersCompany.password,
        );
        
        if (!isPasswordValid) {
          throw new HttpException(
            'Contraseña incorrecta',
            HttpStatus.UNAUTHORIZED,
          );
        }
        
        
        await this.companyRepository.update(usersCompany.idCompany, {
          isOnline: true,
          lastConection: new Date(),
        });
        const role = 'company';
        const payload = {
          sub: usersCompany.idCompany,
          email: usersCompany.email,
          role: role,
        };

        const token = this.jwtService.sign(payload);

        await this.tokenRepository.save({ token });
        res.setHeader('Set-Cookie', [
          cookie.serialize('authToken', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, // 1 hora
            sameSite: 'strict',
            secure: false,
          }),
          cookie.serialize('role', role, {
            httpOnly: false,
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'strict',
            secure: false,
          }),
        ]);
        return {
          message: 'Login exitoso',
          token,
          user: {
            id: usersCompany.idCompany,
            email: usersCompany.email,
            username: usersCompany.companyName,
            role: 'company',
          },
        };
      }
      
      
      const isPasswordValid = await bcrypt.compare(
        password,
        usersAdmin.password,
      );
      if (!isPasswordValid) {
        throw new HttpException(
          'Contraseña incorrecta',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.adminRepository.update(usersAdmin.idAdmin, {
        isOnline: true,
        lastConection: new Date(),
      });
      const role = 'admin';
      const payload = {
        sub: usersAdmin.idAdmin,
        email: usersAdmin.email,
        role: role,
      };

      const token = this.jwtService.sign(payload);

      await this.tokenRepository.save({ token });
      res.setHeader('Set-Cookie', [
        cookie.serialize('authToken', token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60, // 1 hora
          sameSite: 'strict',
          secure: false,
        }),
        cookie.serialize('role', role, {
          httpOnly: false,
          path: '/',
          maxAge: 60 * 60,
          sameSite: 'strict',
          secure: false,
        }),
      ]);
      return {
        message: 'Login exitoso',
        token,
        user: {
          id: usersAdmin.idAdmin,
          email: usersAdmin.email,
          username: usersAdmin.username,
          role: 'admin',
        },
      };
    } catch (error) {
      throw new HttpException(
        `Credenciales inválidas`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async logOut(username: string, token: any, res: Response) {
    try {
      const users = await this.findAdminByUsername(username);

      if (!users) {
        const company = await this.findCompanyByUsername(username);

        if (!company) {
          throw new HttpException(
            'Usuario no encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
        await this.companyRepository.update(company.idCompany, {
          isOnline: false,
        });
        await this.tokenRepository.delete({ token });
        res.setHeader('Set-Cookie', [
          cookie.serialize('authToken', '', {
            httpOnly: true,
            path: '/',
            maxAge: 0,
            sameSite: 'strict',
          }),
          cookie.serialize('role', '', {
            httpOnly: false,
            path: '/',
            maxAge: 0,
            sameSite: 'strict',
          }),
        ]);

        return { message: 'Sesión cerrada correctamente' };
      }
      await this.adminRepository.update(users.idAdmin, {
        isOnline: false,
      });
      await this.tokenRepository.delete({ token });
      res.setHeader('Set-Cookie', [
        cookie.serialize('authToken', '', {
          httpOnly: true,
          path: '/',
          maxAge: 0,
          sameSite: 'strict',
        }),
        cookie.serialize('role', '', {
          httpOnly: false,
          path: '/',
          maxAge: 0,
          sameSite: 'strict',
        }),
      ]);

      return { message: 'Sesión cerrada correctamente' };
    } catch (error) {
      console.error('Error en logOut:', error);
      throw new HttpException(
        'Error al cerrar sesión',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCompany(username: string) {
    const company = await this.findCompanyByUsername(username);
    if (!company) {
      throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.companyRepository.manager.transaction(async (manager) => {
      await manager.query('SET FOREIGN_KEY_CHECKS = 0');
      await manager.delete('company', company.idCompany);
      await manager.query('SET FOREIGN_KEY_CHECKS = 1');
    });

    return { message: 'Empresa eliminada correctamente' };
  }

  async updateCompany(username: string, row: any) {
    const company = await this.findCompanyByUsername(username)
    if (!company) {
      throw new HttpException("La empresa no existe", HttpStatus.NOT_FOUND)
    }

    const updatedFields = {
      companyName: row.name,
      email: row.email,
      contactPerson: row.contactPerson,
      rnc: row.rnc,
      phone: row.cellphone,
      type: row.companyType,
    };

    await this.companyRepository.update(company.idCompany, updatedFields);

    return {
      message: "Empresa actualizada correctamente",
      updated: updatedFields,
    };

  }

  async updatePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.findAdminByUsername(username) || await this.findCompanyByUsername(username);
    
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;

    if (user instanceof Admin) {
      await this.adminRepository.save(user);
    } else {
      await this.companyRepository.save(user);
    }

    return { message: 'Contraseña actualizada correctamente' };
  }
}
