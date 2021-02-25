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
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  height: number;

  @Type(() => Number)
  @IsPositive()
  weight: number;

  @IsDateString()
  dateOfBirth: Date;
}
