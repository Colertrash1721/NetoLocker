import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container } from '../lockers/entities/container.entity';
import { Freeload } from '../lockers/entities/freeload.entity';
import { Estado } from 'src/lockers/entities/estado.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvoicesService {
  private baseURL = 'http://172.206.248.247';
  private loginPath = '/api/method/login';
  private invoicePath = '/api/resource/Sales Invoice';

  constructor(
    @InjectRepository(Container)
    private readonly containerRepo: Repository<Container>,
    @InjectRepository(Freeload)
    private readonly freeloadRepo: Repository<Freeload>,
  ) {}

  async createAndDownloadInvoice(@Res() res: Response) {
    try {
      // 1. Login
      const loginResponse = await axios.post(
        `${this.baseURL}${this.loginPath}`,
        new URLSearchParams({
          usr: 'administrator',
          pwd: 'Wgcr$12ac',
        }),
        { withCredentials: true },
      );

      const cookies = loginResponse.headers['set-cookie'];
      if (!cookies)
        throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);

      // 2. Fetch containers and freeloads
      const [containers, freeloads] = await Promise.all([
        this.containerRepo.find({
          where: {
            estado: { idEstado: 1 },
          },
          relations: ['estado'],
        }),
        this.freeloadRepo.find({
          where: {
            estado: { idEstado: 1 },
          },
          relations: ['estado'],
        }),
      ]);

      if (containers.length === 0 && freeloads.length === 0) {
        throw new HttpException('No items found', HttpStatus.NOT_FOUND);
      }

      // 3. Compose items
      const items = [
        ...containers.map((c) => ({
          item_name: `Container ${c.BL || 'N/A'}`,
          description: `Destino: ${c.destination}, Puerto: ${c.port || 'N/A'}`,
          qty: 1,
          rate: 100.0,
        })),
        ...freeloads.map((f) => ({
          item_name: `Freeload ${f.BL || 'N/A'}`,
          description: `Destino: ${f.destination}, Puerto: ${f.port || 'N/A'}`,
          qty: 1,
          rate: 100.0,
        })),
      ];

      // 4. Crear factura
      const invoiceResponse : any = await axios.post(
        `${this.baseURL}${this.invoicePath}`,
        {
          customer: 'Guest',
          due_date: new Date().toISOString().split('T')[0],
          items,
        },
        {
          headers: {
            Cookie: cookies.join(';'),
            'Content-Type': 'application/json',
          },
        },
      );

      const invoiceName = invoiceResponse.data?.data?.name;
      if (!invoiceName) {
        throw new HttpException(
          'Factura creada pero no se obtuvo el ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 5. Descargar PDF
      const pdfResponse = await axios.get(
        `${this.baseURL}/api/method/frappe.utils.print_format.download_pdf`,
        {
          params: {
            doctype: 'Sales Invoice',
            name: invoiceName,
            format: 'Standard',
          },
          responseType: 'arraybuffer',
          headers: {
            Cookie: cookies.join(';'),
          },
        },
      );

      // 6. Enviar archivo al cliente
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Factura-${invoiceName}.pdf`,
      });

      res.send(pdfResponse.data);
    } catch (error) {
      console.error(error?.response?.data || error);
      throw new HttpException(
        error?.response?.data?.message || 'Error al generar factura',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
