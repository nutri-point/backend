import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'configs/config.interface';

@Injectable()
export class CryptoService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRounds = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  constructor(private configService: ConfigService) {}

  validateHash(originalValue: string, hashedValue: string): Promise<boolean> {
    return compare(originalValue, hashedValue);
  }

  hash(value: string): Promise<string> {
    return hash(value, this.bcryptSaltRounds);
  }
}
