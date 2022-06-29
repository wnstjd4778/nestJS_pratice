import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export const USER_ROLES = ['member', 'admin'] as const;
export type TUserRole = typeof USER_ROLES[number];

@Schema({
  timestamps: { createdAt: 'joinedAt', updatedAt: true },
})
export class User {
  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role: TUserRole;

  @Prop({ type: String, index: true, unique: true, required: true })
  email: string;

  @Prop({ type: String, index: true, trim: true, required: true })
  name: string;

  @Prop({ type: String, index: true, trim: true, required: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  auth: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
