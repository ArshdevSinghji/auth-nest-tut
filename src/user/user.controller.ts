import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }
}
