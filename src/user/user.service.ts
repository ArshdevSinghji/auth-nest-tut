import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(user: User) {
    const createdUser = this.userRepo.create(user);
    return this.userRepo.save(createdUser);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }
}
