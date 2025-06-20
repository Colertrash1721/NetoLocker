import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFrealoadDto {
    @IsString()
    @IsNotEmpty()
    port: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @IsNotEmpty()
    bl: string;

    @IsDateString()
    estimatedDate: string;
}
