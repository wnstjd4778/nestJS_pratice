import mongoose from 'mongoose';

export const FILE_REF_TYPE = ['Todo'] as const;
export type TFile = typeof FILE_REF_TYPE[number];

export interface IFile {
  _id?: string;
  key: string; // url, aws s3키
  filename: string;
  size?: number;
  ref: string | null;
  refType: TFile | null;
  mimetype: string;
  creator?: string;
}