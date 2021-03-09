import { IsString, Length } from 'class-validator';
import {
  GOAL_MAX_DESCRIPTION_LENGTH,
  GOAL_MIN_DESCRIPTION_LENGTH,
} from './constants';

export class UpdateGoalDto {
  @Length(GOAL_MIN_DESCRIPTION_LENGTH, GOAL_MAX_DESCRIPTION_LENGTH)
  @IsString()
  description: string;
}
