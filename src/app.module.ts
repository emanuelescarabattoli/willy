import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ContactModule,
    UserModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
