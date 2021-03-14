import { Type } from 'class-transformer';
import { IsDateString, IsPositive } from 'class-validator';
import { IsCUID, IsExistingEntity } from 'validation';

export class CreateResultDto {
  @IsExistingEntity('user')
  @IsCUID()
  userId: string;

  @IsDateString()
  date: Date;

  @IsPositive()
  @Type(() => Number)
  weight: number;

  @IsPositive()
  @Type(() => Number)
  bodyFatPercent: number;
}
