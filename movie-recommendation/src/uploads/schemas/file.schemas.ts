import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FILE_REF_TYPE, IFile, TFile } from '../../types/file';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class File implements IFile {
  @Prop({ type: String })
  key: string; // url, aws s3키

  @Prop({ type: String, unique: true, required: true })
  filename: string;

  @Prop({ type: Number })
  size?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, index: true })
  ref: string | null;

  @Prop({ type: String, enum: [...FILE_REF_TYPE, null], index: true })
  refType: TFile | null;

  @Prop({ type: String })
  mimetype: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator?: string;
}

export type FileDocument = File & mongoose.Document;
export const FileSchema = SchemaFactory.createForClass(File);
