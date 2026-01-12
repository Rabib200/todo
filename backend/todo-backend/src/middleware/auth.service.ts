import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      const payload = { userId: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async createUser(email: string, password: string): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create({ email, password });
    await this.userRepository.save(newUser);
    const { password: pwd, ...result } = newUser;
    const payload = { userId: newUser.id, email: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }
}
