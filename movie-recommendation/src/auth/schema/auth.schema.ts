import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { AUTH_PROVIDERS, TAuthProvider } from '../../types/auth';

@Schema()
export class Auth {
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

export type AuthDocument = Auth & mongoose.Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);
