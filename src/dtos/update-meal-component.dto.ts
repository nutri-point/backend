import { IsPositive, IsString, MaxLength } from 'class-validator';
import { MEAL_COMPONENT_MAX_NAME_LENGTH } from './constants';
import { Type } from 'class-transformer';

export class UpdateMealComponentDto {
  @MaxLength(MEAL_COMPONENT_MAX_NAME_LENGTH)
  @IsString()
  name: string;

  @IsPositive()
  @Type(() => Number)
  calories: number;

  @IsPositive()
  @Type(() => Number)
  proteins: number;

  @IsPositive()
  @Type(() => Number)
  carbohydrates: number;

  @IsPositive()
  @Type(() => Number)
  fat: number;
}
