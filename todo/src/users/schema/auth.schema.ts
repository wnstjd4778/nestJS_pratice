import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export const AUTH_PROVIDERS = ['kakao', 'naver', 'local'] as const;
import mongoose from 'mongoose';
export type TAuthProvider = typeof AUTH_PROVIDERS[number];

@Schema()
export class Auth {
  @Prop({ type: String, enum: AUTH_PROVIDERS, default: 'local' })
  provider: TAuthProvider;

  // provider가 로컬일 경우 User의 _id
  @Prop({ type: String, required: true })
  providerId: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  user: string;
}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);
