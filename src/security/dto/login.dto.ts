import {
  IsNotEmpty,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
    userName!: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
    password!: string;
}