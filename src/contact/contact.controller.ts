import { Controller, Get, Post, Put, Delete, Body, NotFoundException, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { ContactCreateDto } from './contact.create.dto';
import { ContactUpdateDto } from './contact.update.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    async list(): Promise<Contact[]> {
        return await this.contactService.list();
    }

    @Get(':id')
    async detail(@Param('id', new ParseIntPipe()) id): Promise<Contact> {
        const contact = await this.contactService.detail(id);
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
    async delete(@Param('id', new ParseIntPipe()) id): Promise<object> {
        const affected = await this.contactService.delete(id);
        return { affected };
    }
}
