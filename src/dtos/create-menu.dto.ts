import { IsDateString } from 'class-validator';
import { IsCUID, IsExistingEntity } from 'validation';

export class CreateMenuDto {
  @IsDateString()
  weekStartDate: Date;

  @IsExistingEntity('meal', 'string', { each: true })
  @IsCUID({ each: true })
  meals: string[];
}
