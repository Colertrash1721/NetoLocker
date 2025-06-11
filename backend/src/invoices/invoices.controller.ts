import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Get('generate-invoice-pdf')
  createInvoiceAndDownload(@Res() res: Response) {
    return this.invoicesService.createAndDownloadInvoice(res);
  }
}
