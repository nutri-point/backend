import { IsString, MaxLength } from 'class-validator';
import { IsCUID, IsExistingEntity } from 'validation';
import { MEAL_MAX_NAME_LENGTH } from './constants';

export class CreateMealDto {
  @MaxLength(MEAL_MAX_NAME_LENGTH)
  @IsString()
  name: string;

  @IsString()
  recipe: string;

  @IsExistingEntity('mealComponent', 'string', { each: true })
  @IsCUID({ each: true })
  components: string[];
}
