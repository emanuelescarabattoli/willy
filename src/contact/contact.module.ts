import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { ContactController } from './contact.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    providers: [ContactService],
    controllers: [ContactController],
})
export class ContactModule { }
