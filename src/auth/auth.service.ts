import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, Prisma } from '@prisma/client';
import { Token } from 'shared/token.model';
import { SecurityConfig } from 'configs/config.interface';
import { SignUpDto } from './dto/sign-up.dto';

// Services
import { CryptoService } from 'shared/crypto.service';
import { PrismaService } from 'shared/prisma.service';
import { UserService } from 'user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async createUser(payload: SignUpDto): Promise<Token> {
    const hashedPassword = await this.cryptoService.hash(payload.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          height: payload.height,
          weight: payload.weight,
          dateOfBirth: payload.dateOfBirth,
          passwordHash: hashedPassword,
        },
      });

      const token = await this.generateToken({
        userId: user.id,
      });

      await this.userService.updateRefreshTokenHash(
        user.id,
        token.refreshToken,
      );

      return token;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.cryptoService.validateHash(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.generateToken({
      userId: user.id,
    });

    await this.userService.updateRefreshTokenHash(user.id, token.refreshToken);

    return token;
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  async generateToken(payload: { userId: string }) {
    const refreshToken = await this.jwtService.signAsync(payload);

    const securityConfig = this.configService.get<SecurityConfig>('security');
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: securityConfig.refreshIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const userId = await this.verifyRefreshToken(token);
    const newToken = await this.generateToken({ userId });

    const refreshTokenHash = await this.cryptoService.hash(
      newToken.refreshToken,
    );
    await this.userService.updateRefreshTokenHash(userId, refreshTokenHash);

    return newToken;
  }

  private async verifyRefreshToken(refreshToken: string) {
    try {
      const { userId } = this.jwtService.verify(refreshToken);

      const user = await this.validateUser(userId);

      if (!user || !user.isActive || !user.refreshTokenHash) {
        throw new UnauthorizedException();
      }

      const isValid = await this.cryptoService.validateHash(
        refreshToken,
        user.refreshTokenHash,
      );

      if (!isValid) {
        throw new UnauthorizedException();
      }

      return userId;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
