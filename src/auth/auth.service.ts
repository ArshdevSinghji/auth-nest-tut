import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found!');

    const isMatch = await this.hashService.comparingPass(
      password,
      user?.password,
    );

    if (!isMatch) throw new UnauthorizedException("credentails don't match!");

    const payload = { userId: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
