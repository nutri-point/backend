import { IsNumber, IsString, MaxLength } from 'class-validator';
import { MEAL_MAX_NAME_LENGTH } from './constants';
import { IsCUID } from 'validation';

export class UpdateMealDto {
  @MaxLength(MEAL_MAX_NAME_LENGTH)
  @IsString()
  name: string;

  @IsString()
  recipe: string;

  // TODO: Add validation if all meal components exist
  @IsCUID({ each: true })
  components: string[];
}
