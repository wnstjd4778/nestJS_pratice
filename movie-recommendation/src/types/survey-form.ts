export interface SurveyForm {
  _id: string;
  title: string;
  content: string;
  surveyQuestions: [string];
  writer: string;
  viewCnt: number;
  cost: number;
  maxResult: number;
  attachments: [string];
  comments: [string];
  participants: [string];
}
