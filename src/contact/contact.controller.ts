import { Controller, Get, Post, Put, Delete, Body, ValidationPipe, UsePipes, NotFoundException, Param } from '@nestjs/common';

import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { ContactCreateDto } from './contact.create.dto';
import { ContactUpdateDto } from './contact.update.dto';
import { IdParameters } from '../common/id.parameters';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    async list(): Promise<Contact[]> {
        return await this.contactService.list();
    }

    @Get(':id')
    async detail(@Param() parameters: IdParameters): Promise<Contact> {
        const contact = await this.contactService.detail(parameters.id);
        if (contact) {
            return contact;
        }
        throw new NotFoundException('The contact does not exists');
    }

    @Post()
    async create(@Body() contactCreateDto: ContactCreateDto): Promise<Contact> {
        return await this.contactService.create(contactCreateDto);
    }

    @Put()
    async update(@Body() contactUpdateDto: ContactUpdateDto): Promise<Contact> {
        const contact = await this.contactService.update(contactUpdateDto);
        if (contact) {
            return contact;
        }
        throw new NotFoundException('The contact does not exists');
    }

    @Delete(':id')
    async delete(@Param() parameters: IdParameters): Promise<object> {
        const affected = await this.contactService.delete(parameters.id);
        return { affected };
    }
}
