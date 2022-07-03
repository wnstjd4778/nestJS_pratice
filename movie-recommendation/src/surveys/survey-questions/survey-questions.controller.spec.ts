import { Test, TestingModule } from '@nestjs/testing';
import { SurveyQuestionsController } from './survey-questions.controller';

describe('SurveyQuestionsController', () => {
  let controller: SurveyQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyQuestionsController],
    }).compile();

    controller = module.get<SurveyQuestionsController>(SurveyQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
