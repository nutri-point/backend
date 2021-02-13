import { IsString, Length } from 'class-validator';
import { MIN_DESCRIPTION_LENGTH } from './constants';

export class UpdateGoalDto {
  @IsString()
  @Length(MIN_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH)
  description: string;
}
