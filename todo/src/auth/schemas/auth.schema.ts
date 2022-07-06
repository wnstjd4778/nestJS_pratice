import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../types/auth';

export const AUTH_PROVIDERS = ['kakao', 'naver', 'local'] as const;
export type TAuthProvider = typeof AUTH_PROVIDERS[number];

type RequiredFieldType = Pick<
  Auth,
  'provider' | 'providerId' | 'password' | 'user'
>;
type OptionalFieldType = Partial<Pick<Auth, 'provider'>>;
type FieldType = RequiredFieldType & OptionalFieldType;

@Schema({
  collection: 'auth',
  timestamps: { createdAt: true, updatedAt: false },
})
export class AuthModel implements FieldType {
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

export type AuthDocument = AuthModel & Document;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
