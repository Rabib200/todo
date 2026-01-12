import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Replace with actual database user lookup
    if (email === 'demo@gmail.com' && password === 'password') {
      const payload = { sub: '1', email };
      return {
        access_token: this.jwtService.sign(payload),
        user: { userId: '1', email },
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
