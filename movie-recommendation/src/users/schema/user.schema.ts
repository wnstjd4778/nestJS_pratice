import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User, TUserRole, USER_ROLES } from '../../types/user';

type FieldType = Pick<User, 'email' | 'name' | 'phone'> &
  Partial<Pick<User, 'role' | 'auth' | 'point'>>;
@Schema({ collection: 'user' })
export class UserModel implements FieldType {
  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, require: true, index: true, unique: true })
  name: string;

  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role?: TUserRole;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuthModel', default: null })
  auth?: string;

  @Prop({ type: Number, default: 0 })
  point?: number;
}

export type UserDocument = UserModel & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);
