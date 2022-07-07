export interface SurveyQuestion {
  _id: string;
  question: string;
  isMultipleChoice: boolean;
  choice?: [string];
  surveyForm?: string;
}
