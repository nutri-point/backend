import { MIN_PASSWORD_LENGTH } from './constants';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  height: number;

  @IsPositive()
  @Type(() => Number)
  weight: number;

  @IsDateString()
  dateOfBirth: Date;
}
