import { Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';

// Repositories
import { GoalRepository } from './goal.repository';
import { MealComponentRepository } from './meal-component.repository';
import { MealRepository } from './meal.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';

import { PrismaService } from 'services';

@Injectable()
export class UnitOfWork {
  public roleRepository: RoleRepository;
  public userRepository: UserRepository;
  public goalRepository: GoalRepository;
  public mealRepository: MealRepository;
  public mealComponentRepository: MealComponentRepository;

  constructor(prisma: PrismaService) {
    this.roleRepository = new RoleRepository(prisma);

    this.userRepository = new UserRepository(prisma, this.roleRepository);
    this.goalRepository = new GoalRepository(prisma, this.roleRepository);

    this.mealRepository = new MealRepository(prisma);
    this.mealComponentRepository = new MealComponentRepository(prisma);
  }

  public getRepository(repositoryName: string): IRepository<any, any> {
    const lowerCaseRepoName = repositoryName.toLowerCase();

    switch (lowerCaseRepoName) {
      case 'role':
        return this.roleRepository;
      case 'user':
        return this.userRepository;
      case 'goal':
        return this.goalRepository;
      case 'meal':
        return this.mealRepository;
      case 'mealcomponent':
        return this.mealComponentRepository;
      default:
        throw new Error(
          `Repository with name ${repositoryName} does not exist.`,
        );
    }
  }
}
