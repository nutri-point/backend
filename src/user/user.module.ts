import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'shared/prisma.service';
import { IsExistingUserConstraint } from 'validation/is-existing-user-id.decorator';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, IsExistingUserConstraint],
  exports: [UserService],
})
export class UserModule {}
