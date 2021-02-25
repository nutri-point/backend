import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { GoalService } from '../goal.service';
import { GoalRepository, RoleRepository } from 'repositories';

describe('GoalService', () => {
  let service: GoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalService, PrismaService, GoalRepository, RoleRepository],
    }).compile();

    service = module.get<GoalService>(GoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
