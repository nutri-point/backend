import { Test, TestingModule } from '@nestjs/testing';
import { GoalController } from '../goal.controller';
import { GoalService, PrismaService } from 'services';
import { GoalRepository, RoleRepository } from 'repositories';

describe('GoalController', () => {
  let controller: GoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalController],
      providers: [GoalService, PrismaService, GoalRepository, RoleRepository],
    }).compile();

    controller = module.get<GoalController>(GoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
