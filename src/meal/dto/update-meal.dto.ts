import { IsNumber, IsString, MaxLength } from 'class-validator';
import { MAX_NAME_LENGTH } from './constants';
import { IsCUID } from 'shared/validation';

export class UpdateMealDto {
  @IsString()
  @MaxLength(MAX_NAME_LENGTH)
  name: string;

  @IsString()
  recipe: string;

  // TODO: Add validation if all meal components exist
  @IsCUID({ each: true })
  @IsNumber({}, { each: true })
  components: number[];
}
