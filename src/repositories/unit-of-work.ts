import { Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';

// Repositories
import { GoalRepository } from './goal.repository';
import { ResultRepository } from './result.repository';
import { MealRepository } from './meal.repository';
import { MealComponentRepository } from './meal-component.repository';
import { MenuRepository } from './menu.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';

import { PrismaService } from 'services';

@Injectable()
export class UnitOfWork {
  public roleRepository: RoleRepository;
  public userRepository: UserRepository;
  public goalRepository: GoalRepository;
  public resultRepository: ResultRepository;
  public mealRepository: MealRepository;
  public mealComponentRepository: MealComponentRepository;
  public menuRepository: MenuRepository;

  constructor(prisma: PrismaService) {
    this.roleRepository = new RoleRepository(prisma);

    this.userRepository = new UserRepository(prisma, this.roleRepository);
    this.goalRepository = new GoalRepository(prisma, this.roleRepository);
    this.resultRepository = new ResultRepository(prisma, this.roleRepository);

    this.mealRepository = new MealRepository(prisma);
    this.mealComponentRepository = new MealComponentRepository(prisma);
    this.menuRepository = new MenuRepository(prisma);
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
      case 'result':
        return this.resultRepository;
      case 'meal':
        return this.mealRepository;
      case 'mealcomponent':
        return this.mealComponentRepository;
      case 'menu':
        return this.menuRepository;
      default:
        throw new Error(
          `Repository with name ${repositoryName} does not exist.`,
        );
    }
  }
}
