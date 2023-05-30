import { Model } from 'mongoose';
import randtoken from 'rand-token';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { encryptPassword } from '@security/helpers/passwords';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async findOne(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName: userName });
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const validUntil = new Date();
    validUntil.setHours(validUntil.getHours() + 24);

    const password_recovery_hash = encryptPassword(JSON.stringify({ validUntil }));
    const encryptedPassword = encryptPassword(registerDto.password);

    console.log(password_recovery_hash);
    return new this.userModel({ ...registerDto, password_recovery_hash, password: encryptedPassword, refreshToken: randtoken.uid(256) }).save();
  }

  update(id: string, updateUserDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }
}