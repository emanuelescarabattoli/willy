import { Controller, Get, Post, Put, Delete, Body, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto } from './user.create.dto';
import { UserUpdateDto } from './user.update.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async list(): Promise<User[]> {
        return await this.userService.list();
    }

    @Get(':id')
    async detail(@Param('id', new ParseIntPipe()) id): Promise<User> {
        const user = await this.userService.detail(id);
        if (user) {
            return user;
        }
        throw new NotFoundException('The user does not exists');
    }

    @Post()
    async create(@Body() userCreateDto: UserCreateDto): Promise<User> {
        return await this.userService.create(userCreateDto);
    }

    @Put()
    async update(@Body() userUpdateDto: UserUpdateDto): Promise<User> {
        const user = await this.userService.update(userUpdateDto);
        if (user) {
            return user;
        }
        throw new NotFoundException('The user does not exists');
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id): Promise<object> {
        const affected = await this.userService.delete(id);
        return { affected };
    }
}
