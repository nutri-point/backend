import { Module } from '@nestjs/common';
import { MenuService, PrismaService } from 'services';
import { MenuController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class MenuModule {}
