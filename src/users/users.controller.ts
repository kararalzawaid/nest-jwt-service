import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { Public } from '@security/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) { }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}