import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'configs/config';
import { AuthModule, UserModule, GoalModule, MealModule } from 'modules';

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
