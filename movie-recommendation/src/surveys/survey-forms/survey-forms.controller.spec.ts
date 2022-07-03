import { Test, TestingModule } from '@nestjs/testing';
import { SurveyFormsController } from './survey-forms.controller';

describe('SurveyFormsController', () => {
  let controller: SurveyFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyFormsController],
    }).compile();

    controller = module.get<SurveyFormsController>(SurveyFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
