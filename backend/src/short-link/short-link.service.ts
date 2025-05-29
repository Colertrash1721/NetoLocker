import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class ShortLinkService {
  private readonly traccarApiUrl = process.env.My_Ip;
  private readonly traccarApiToken = process.env.My_Token;

  constructor(private jwtService: JwtService) {}

  authHeader(username: string, password: string): string {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return authHeader;
  }

  async generateShortLink(
    deviceName: string,
    expirationTime: any,
    companyName: string,
    username: string,
    password: string,
  ) {
    if (!deviceName || !expirationTime || !companyName) {
      throw new HttpException(
        'Device name, expiration time and company name are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const authHeader = this.authHeader(username, password);
    const payload = {
      deviceName: deviceName,
      expirationTime: expirationTime,
      companyName: companyName,
      username: `${deviceName}@${companyName}`,
      password: `${deviceName}@${companyName}`,
    };
    const headers = {
      Authorization: `${authHeader}`,
      'Content-Type': 'application/json',
    };

    try {
      // Check if the user already exists
      const userResponse = await axios.get(`${this.traccarApiUrl}/users`, {
        headers: headers,
      });
      const users = userResponse.data;
      const userExist = await users.find(
        (user: any) => user.name === `${deviceName}@${companyName}`,
      );
      // If the user already exists, throw an error
      if (userExist) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      // Creating the user
      const response = await axios.post(
        `${this.traccarApiUrl}/users`,
        {
          name: `${deviceName}@${companyName}`,
          email: `${deviceName}@${companyName}.com`,
          password: `${deviceName}@${companyName}`,
          administrator: false,
          expirationTime: expirationTime,
        },
        {
          headers: headers,
        },
      );

      const user = response.data;
      const userId = user.id;

      // searching if the device exist
      const deviceResponse = await axios.get(`${this.traccarApiUrl}/devices`, {
        headers: headers,
      });

      const device = deviceResponse.data;

      const deviceExist = await device.find(
        (device: any) => device.name === `${deviceName}`,
      );

      if (!deviceExist) {
        throw new HttpException(`device doesn't exist`, HttpStatus.NOT_FOUND);
      }

      const deviceId = deviceExist.id;
      console.log("Device Exist", deviceId, userId);
      //Asign the device to the user
      await axios.post(`${this.traccarApiUrl}/permissions`,
        {
          userId: userId,
          deviceId: deviceId
        },
        {
          headers: headers,
        }
      )

      console.log("assignment the device");

      // Generating the short link
      console.log('Generating short link...');
      const shortLink = this.jwtService.sign(payload);
      console.log('Short link generated:', shortLink);
      // Send the short link to the user
      return shortLink;
    } catch (error) {
      console.error('Error generating short link:', error);
      throw new HttpException(
        'Error generating short link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getToken(token: any) {
    try {
      const data = this.jwtService.decode(token);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
