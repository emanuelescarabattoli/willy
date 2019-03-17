import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from './contact.entity';
import { ContactCreateDto } from './dto/contact.create.dto';
import { ContactUpdateDto } from './dto/contact.update.dto';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>) { }

    // The list of contacts
    async list(username: string): Promise<Contact[]> {
        return await this.contactRepository.find({ username });
    }

    // The detail of a contact
    async detail(id: number, username: string): Promise<Contact> {
        return await this.contactRepository.findOne({ id, username });
    }

    // Saves a contract and returns the created object
    async create(contactCreateDto: ContactCreateDto, username: string): Promise<Contact> {
        return await this.contactRepository.save({ ...contactCreateDto, status: 1, username });
    }

    // Saves a contract and returns the created object
    async update(contactUpdateDto: ContactUpdateDto, username: string): Promise<Contact> {
        const contact = await this.contactRepository.findOne({ id: contactUpdateDto.id });
        if (contact) {
            return await this.contactRepository.save({ ...contact, ...contactUpdateDto, username });
        }
        return null;
    }

    // Saves a contract and returns the created object
    async delete(id: number, username: string): Promise<number> {
        const result = await this.contactRepository.delete({ id, username });
        return result.affected;
    }
}
