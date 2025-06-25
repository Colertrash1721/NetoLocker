import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateCompany {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  contactPerson: string;

  @IsOptional()
  @IsString()
  rnc?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  taxes?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' || value === undefined ? null : parseFloat(value),
  )
  @IsNumber({}, { message: 'El descuento debe ser un número válido' })
  discount?: number;
}
