import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class ContactCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
