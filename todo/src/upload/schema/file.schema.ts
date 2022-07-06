import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from 'rxjs';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { File, FILE_REF_TYPE, TFile } from '../../types/file';

type FieldType = Pick<
  File,
  'filename' | 'key' | 'mimetype' | 'size' | 'creator'
> &
  Partial<Pick<File, 'refType' | 'ref'>>;
@Schema({
  collection: 'file',
  timestamps: { createdAt: true, updatedAt: false },
})
export class FileModel implements FieldType {
  @Prop({ type: String })
  key: string; // url, aws s3키

  @Prop({ type: String, unique: true, required: true })
  filename: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, index: true })
  ref?: string | null;

  @Prop({ type: String, enum: [...FILE_REF_TYPE, null], index: true })
  refType?: TFile | null;

  @Prop({ type: String })
  mimetype: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string;
}

export type FileDocument = FileModel & Document;
export const FileSchema = SchemaFactory.createForClass(FileModel);
