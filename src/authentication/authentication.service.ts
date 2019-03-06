import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

@Injectable()
export class AuthenticationService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    // Starting from an username it generates a token
    async generateToken(username: string) {
        const expiresIn = 3600;
        const secretOrKey = '1234567890';
        const user = { username };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return { expires_in: expiresIn, token };
    }

    async validateUser(user): Promise<boolean> {
        if (user && user.username) {
            return this.userRepository.findOne({ username: user.username }) !== null;
        }
        return false;
    }
}
