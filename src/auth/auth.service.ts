import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userService.create({ email, password: hashed });
  }

  async findOrCreateGoogleUser(profile: {
    id?: string;
    emails?: { value: string }[];
  }) {
    const googleId = profile?.id ?? '';
    let user = await this.userService.findByGoogleId(googleId);
    if (!user) {
      const email = profile?.emails?.[0]?.value ?? '';
      user = await this.userService.create({
        email,
        googleId,
      });
    }
    return user;
  }

  googleLogin(req: { user: User }): { access_token: string; user: User } {
    const user = req.user;
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
