import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: any;

  @Prop({ required: true })
    userName!: string;

  @Prop({ required: true })
    password!: string;

  @Prop({ required: true })
    refreshToken!: string;

  @Prop({ required: true })
    password_recovery_hash!: string;

  @Prop({ required: true })
    email!: string;

  @Prop({ required: true, default: Date.now, index: true })
    createdAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).index({ email: 1 }, { unique: true });
