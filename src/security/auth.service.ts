import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { decryptPassword } from './helpers/passwords';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: LoginDto) {
    const { userName, password } = signInDto;

    const user = await this.usersService.findOne(userName);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const originalPassword = decryptPassword(user.password);

    if (originalPassword !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.userName, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}