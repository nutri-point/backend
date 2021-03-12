import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'configs/config';
import { AuthModule, UserModule, GoalModule, MealModule } from 'modules';
import { MenuModule } from 'modules/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    GoalModule,
    MealModule,
    MenuModule,
  ],
  providers: [],
})
export class AppModule {}
