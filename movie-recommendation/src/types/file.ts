export const FILE_REF_TYPE = ['SurveyForm', 'SurveyQuestion'] as const;
export type TFile = typeof FILE_REF_TYPE[number];

export interface File {
  key: string;
  filename: string;
  size: number;
  ref: string | null;
  refType: TFile | null;
  mimetype: string;
  creator: string;
}
