import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ContactModule } from './contact/contact.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ContactModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
