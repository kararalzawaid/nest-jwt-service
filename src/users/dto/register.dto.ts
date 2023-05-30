import {
  IsEmail,
  IsNotEmpty,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
    userName!: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
    password!: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
    email!: string;
}