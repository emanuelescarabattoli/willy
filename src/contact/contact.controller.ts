import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { ContactCreateDto } from './contact.create.dto';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    async create(@Body() contactCreateDto: ContactCreateDto): Promise<Contact> {
        return await this.contactService.create(contactCreateDto);
    }

    @Get()
    async list(): Promise<Contact[]> {
        return await this.contactService.list();
    }

}
