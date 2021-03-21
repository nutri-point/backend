import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'configs/config';
import {
  AuthModule,
  UserModule,
  GoalModule,
  MealModule,
  MealComponentModule,
  ResultModule,
  ShoppingListModule,
  MenuModule,
} from 'modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    GoalModule,
    ResultModule,
    ShoppingListModule,
    MealModule,
    MealComponentModule,
    MenuModule,
  ],
  providers: [],
})
export class AppModule {}
