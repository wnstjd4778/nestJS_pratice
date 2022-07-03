import { Test, TestingModule } from '@nestjs/testing';
import { SurveyQuestionsService } from './survey-questions.service';

describe('SurveyQuestionsService', () => {
  let service: SurveyQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyQuestionsService],
    }).compile();

    service = module.get<SurveyQuestionsService>(SurveyQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
