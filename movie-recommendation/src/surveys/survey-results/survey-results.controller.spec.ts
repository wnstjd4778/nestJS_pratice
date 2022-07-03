import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResultsController } from './survey-results.controller';

describe('SurveyResultsController', () => {
  let controller: SurveyResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyResultsController],
    }).compile();

    controller = module.get<SurveyResultsController>(SurveyResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
