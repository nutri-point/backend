import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MealModule } from './meal/meal.module';
import config from 'configs/config';
import { GoalModule } from 'modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    GoalModule,
    MealModule,
  ],
  providers: [],
})
export class AppModule {}
