import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventDto {

    @IsNumber()
    @IsNotEmpty()
    idEvent: number;
    
    @IsString()
    @IsNotEmpty()
    deviceName: string;
    
    @IsString()
    @IsNotEmpty()
    eventType: string;
    
    @IsDate()
    @IsNotEmpty()
    eventDate: Date;
}