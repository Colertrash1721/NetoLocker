import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class DeviceEventsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  salida: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  entrada: string[];
}