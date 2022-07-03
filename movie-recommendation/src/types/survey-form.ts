export interface ISurveyForm {
  _id?: string;
  title: string;
  content: string;
  surveyQuestions?: [string];
  writer: string;
  viewCnt: number;
  cost: number;
  maxResult: number;
}
