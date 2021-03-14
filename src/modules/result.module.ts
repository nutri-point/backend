import { Module } from '@nestjs/common';
import { ResultController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { ResultService, PrismaService } from 'services';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [ResultController],
  providers: [
    ResultService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class ResultModule {}
