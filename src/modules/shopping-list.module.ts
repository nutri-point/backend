import { Module } from '@nestjs/common';
import { ShoppingListController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { ShoppingListService, PrismaService } from 'services';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [ShoppingListController],
  providers: [
    ShoppingListService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class ShoppingListModule {}
