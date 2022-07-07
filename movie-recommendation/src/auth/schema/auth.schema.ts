import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth, AUTH_PROVIDERS, TAuthProvider } from '../../types/auth';

type FieldType = Pick<Auth, 'password' | 'provider' | 'providerId' | 'user'>;

@Schema({ collection: 'auth' })
export class AuthModel implements FieldType {
  @Prop({ type: String, enum: AUTH_PROVIDERS, default: 'local' })
  provider: TAuthProvider;

  @Prop({ type: String, unique: true, required: true })
  providerId: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null,
  })
  user: string;
}

export type AuthDocument = AuthModel & mongoose.Document;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
