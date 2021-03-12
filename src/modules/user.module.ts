import { Module } from '@nestjs/common';
import { UserService } from 'services';
import { UserController } from 'controllers';
import { IsExistingEntityConstraint } from 'validation';
import { PrismaService } from 'services';
import { UnitOfWork } from 'repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    IsExistingEntityConstraint,
    UnitOfWork,
  ],
  exports: [UserService],
})
export class UserModule {}
