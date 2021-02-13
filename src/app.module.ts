import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GoalModule } from './goal/goal.module';
import { MealService } from './meal/meal.service';
import { MealModule } from './meal/meal.module';
import config from 'configs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    GoalModule,
    MealModule,
  ],
  providers: [MealService],
})
export class AppModule {}
