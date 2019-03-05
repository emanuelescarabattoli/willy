import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserCreateDto } from './user.create.dto';
import { UserUpdateDto } from './user.update.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    // The list of users
    async list(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // The detail of a user
    async detail(id: number): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    // Saves a contract and returns the created object
    async create(userCreateDto: UserCreateDto): Promise<User> {
        return await this.userRepository.save({ ...userCreateDto, status: 1 });
    }

    // Saves a contract and returns the created object
    async update(userUpdateDto: UserUpdateDto): Promise<User> {
        const user = await this.userRepository.findOne({ id: userUpdateDto.id });
        if (user) {
            return await this.userRepository.save({ ...user, ...userUpdateDto });
        }
        return null;
    }

    // Saves a contract and returns the created object
    async delete(id: number): Promise<number> {
        const result = await this.userRepository.delete({ id });
        return result.affected;
    }
}
