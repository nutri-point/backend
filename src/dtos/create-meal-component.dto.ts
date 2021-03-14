import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, MaxLength } from 'class-validator';
import { MEAL_COMPONENT_MAX_NAME_LENGTH } from './constants';

export class CreateMealComponentDto {
  @MaxLength(MEAL_COMPONENT_MAX_NAME_LENGTH)
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  calories: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  proteins: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  carbohydrates: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  fat: number;
}
