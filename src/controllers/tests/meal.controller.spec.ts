import { Test, TestingModule } from '@nestjs/testing';
import { MealController } from '../meal.controller';
import { MealService, PrismaService } from 'services';

describe('MealController', () => {
  let controller: MealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealController],
      providers: [MealService, PrismaService],
    }).compile();

    controller = module.get<MealController>(MealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
