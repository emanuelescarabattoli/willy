import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class ContactUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly description: string;

    @IsEmail()
    readonly email: string;
}
