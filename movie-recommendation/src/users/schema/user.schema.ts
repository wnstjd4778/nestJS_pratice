import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/schema/auth.schema';
import { IUser, TUserRole, USER_ROLES } from '../../types/user';

@Schema()
export class User implements IUser {
  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, require: true, index: true, unique: true })
  name: string;

  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role: TUserRole;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth', default: null })
  auth: string;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
