import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { File, FILE_REF_TYPE, TFile } from '../../types/file';

type FieldType = Pick<
  File,
  'key' | 'filename' | 'size' | 'mimetype' | 'creator'
> &
  Partial<Pick<File, 'ref' | 'refType'>>;

@Schema({
  collection: 'file',
  timestamps: { createdAt: true, updatedAt: false },
})
export class FileModel implements FieldType {
  @Prop({ type: String })
  key: string; // url, aws s3키

  @Prop({ type: String, required: true })
  filename: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, index: true })
  ref?: string | null;

  @Prop({
    type: String,
    enum: [...FILE_REF_TYPE, null],
    index: true,
    default: null,
  })
  refType?: TFile | null;

  @Prop({ type: String })
  mimetype: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string;
}

export type FileDocument = FileModel & mongoose.Document;
export const FileSchema = SchemaFactory.createForClass(FileModel);
