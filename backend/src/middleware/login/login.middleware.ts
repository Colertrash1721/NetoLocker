import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' && req.url.includes('/auth/login')) {
      const logData = {
        email: req.body.email || 'N/A',
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        date: new Date().toISOString(),
      };

      const logLine = `[${logData.date}] LOGIN ATTEMPT | Email: ${logData.email} | IP: ${logData.ip} | User-Agent: ${logData.userAgent}\n`;

      const logsDir = path.join(process.cwd(), 'logs');
      const logPath = path.join(logsDir, 'login.log');

      // ✅ Asegura que la carpeta 'logs' exista
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      fs.appendFile(logPath, logLine, (err) => {
        if (err) {
          console.error('Error writing login log:', err);
        }
      });
    }
    next();
  }
}
