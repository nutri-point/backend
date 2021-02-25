import { Module } from '@nestjs/common';
import { UserService } from 'services';
import { UserController } from 'controllers';
import { IsExistingRoleConstraint, IsExistingUserConstraint } from 'validation';
import { PrismaService } from 'services';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    IsExistingUserConstraint,
    IsExistingRoleConstraint,
  ],
  exports: [UserService],
})
export class UserModule {}
