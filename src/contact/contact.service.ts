import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>) { }

    async list(): Promise<Contact[]> {
        return await this.contactRepository.find();
    }

    async create(contact: Contact): Promise<Contact> {
        await this.contactRepository.save(contact);
        return contact;
    }
}
