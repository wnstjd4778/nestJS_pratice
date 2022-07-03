import { Test, TestingModule } from '@nestjs/testing';
import { SurveyFormsService } from './survey-forms.service';

describe('SurveyFormsService', () => {
  let service: SurveyFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyFormsService],
    }).compile();

    service = module.get<SurveyFormsService>(SurveyFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
