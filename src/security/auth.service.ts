import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { decryptPassword } from './helpers/passwords';
import { jwtConstants, jwtRefreshConstants } from './constants/auth';

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

    return this.getTokens(user._id, userName);
  }

  private async getTokens(userId: string, username: string) {
    const payload = { username, sub: userId };

    const payloadCredentials = {
      secret: jwtConstants.secret,
      expiresIn: '1m',
    };

    const refreshPayloadCredentials = {
      secret: jwtRefreshConstants.secret,
      expiresIn: '7d',
    };

    const token = await this.jwtService.signAsync(payload, payloadCredentials);
    const refreshToken = await this.jwtService.signAsync(payload, refreshPayloadCredentials);

    await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });

    return { token, refreshToken };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException();

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user._id, user.userName);

    return tokens;
  }
}