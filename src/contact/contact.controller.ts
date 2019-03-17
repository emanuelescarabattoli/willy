import { Controller, Get, Post, Put, Delete, Body, NotFoundException, Param, ParseIntPipe, Req } from '@nestjs/common';
import { IncomingMessage } from 'http';

import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { ContactCreateDto } from './dto/contact.create.dto';
import { ContactUpdateDto } from './dto/contact.update.dto';

@Controller('')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    async list(@Req() request: IncomingMessage): Promise<Contact[]> {
        const username: any = request.headers.username;
        return await this.contactService.list(username);
    }

    @Get(':id')
    async detail(@Req() request: IncomingMessage, @Param('id', new ParseIntPipe()) id): Promise<Contact> {
        const username: any = request.headers.username;
        const contact = await this.contactService.detail(id, username);
        if (contact) {
            return contact;
        }
        throw new NotFoundException('The contact does not exists');
    }

    @Post()
    async create(@Req() request: IncomingMessage, @Body() contactCreateDto: ContactCreateDto): Promise<Contact> {
        const username: any = request.headers.username;
        return await this.contactService.create(contactCreateDto, username);
    }

    @Put()
    async update(@Req() request: IncomingMessage, @Body() contactUpdateDto: ContactUpdateDto): Promise<Contact> {
        const username: any = request.headers.username;
        const contact = await this.contactService.update(contactUpdateDto, username);
        if (contact) {
            return contact;
        }
        throw new NotFoundException('The contact does not exists');
    }

    @Delete(':id')
    async delete(@Req() request: IncomingMessage, @Param('id', new ParseIntPipe()) id): Promise<object> {
        const username: any = request.headers.username;
        const affected = await this.contactService.delete(id, username);
        return { affected };
    }
}
