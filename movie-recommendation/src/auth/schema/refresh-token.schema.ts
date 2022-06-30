import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class RefreshToken {
  @Prop({ type: String, required: true, unique: true })
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  @Prop({ type: Date, expires: '1m' })
  createdAt: Date;
}

export type RefreshTokenDocument = RefreshToken & mongoose.Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
