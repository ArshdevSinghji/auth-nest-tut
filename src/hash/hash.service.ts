import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashingPass(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparingPass(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
