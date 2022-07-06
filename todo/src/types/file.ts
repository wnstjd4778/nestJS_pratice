import { CreateBase } from './base';

export const FILE_REF_TYPE = ['Todo'] as const;
export type TFile = typeof FILE_REF_TYPE[number];

export interface File extends CreateBase {
  key: string;
  filename: string;
  size: number;
  ref: string | null;
  refType: TFile;
  mimetype: string;
}
