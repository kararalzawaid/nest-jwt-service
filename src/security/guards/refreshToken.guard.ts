import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}

// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token