import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContainerDto {
    @IsString()
    @IsNotEmpty()
    port: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @IsNotEmpty()
    bl: string;

    @IsString()
    nContainer: string;
}
