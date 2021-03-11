import { Module } from '@nestjs/common';
import { UserService } from 'services';
import { UserController } from 'controllers';
import { IsExistingRoleConstraint, IsExistingUserConstraint } from 'validation';
import { PrismaService } from 'services';
import { UnitOfWork } from 'repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    IsExistingUserConstraint,
    IsExistingRoleConstraint,
    UnitOfWork,
  ],
  exports: [UserService],
})
export class UserModule {}
