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
    async list(): Promise<Contact[]> {
        return await this.contactRepository.find();
    }

    // The detail of a contact
    async detail(id: number): Promise<Contact> {
        return await this.contactRepository.findOne({ id });
    }

    // Saves a contract and returns the created object
    async create(contactCreateDto: ContactCreateDto): Promise<Contact> {
        return await this.contactRepository.save({ ...contactCreateDto, status: 1 });
    }

    // Saves a contract and returns the created object
    async update(contactUpdateDto: ContactUpdateDto): Promise<Contact> {
        const contact = await this.contactRepository.findOne({ id: contactUpdateDto.id });
        if (contact) {
            return await this.contactRepository.save({ ...contact, ...contactUpdateDto });
        }
        return null;
    }

    // Saves a contract and returns the created object
    async delete(id: number): Promise<number> {
        const result = await this.contactRepository.delete({ id });
        return result.affected;
    }
}
