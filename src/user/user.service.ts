import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from './user.entity';
import * as Crypto from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private userRepo: Repository<userEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
  ) {
    const user = new userEntity();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.password = String(Crypto.SHA256(password));
    return await this.userRepo.save(user);
  }

  async signIn(email: string, password: string) {
    const user =await  this.userRepo.findOneBy({
      email,
      password: String(Crypto.SHA256(password)),
    });

    if (!user) {
      throw new NotFoundException();
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
