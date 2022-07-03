import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResultsService } from './survey-results.service';

describe('SurveyResultsService', () => {
  let service: SurveyResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyResultsService],
    }).compile();

    service = module.get<SurveyResultsService>(SurveyResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
