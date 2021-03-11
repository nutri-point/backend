import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'configs/config.interface';
import { UserModule } from './user.module';
import { AuthService, CryptoService, PrismaService } from 'services';
import { AuthController } from 'controllers';

// TODO: prettify these exports
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RoleGuard } from 'auth/roles/role.guard';
import { UnitOfWork } from 'repositories';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RoleGuard,
    CryptoService,
    PrismaService,
    UnitOfWork,
  ],
  exports: [JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
