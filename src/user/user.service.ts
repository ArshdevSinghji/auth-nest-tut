import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(user: User) {
    user.password = await this.hashService.hashingPass(user.password);
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
