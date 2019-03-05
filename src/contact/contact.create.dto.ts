import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ContactCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
