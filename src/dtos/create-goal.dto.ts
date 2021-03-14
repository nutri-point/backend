import { IsString, Length } from 'class-validator';
import { IsCUID, IsExistingEntity } from 'validation';
import {
  GOAL_MAX_DESCRIPTION_LENGTH,
  GOAL_MIN_DESCRIPTION_LENGTH,
} from './constants';

export class CreateGoalDto {
  @IsExistingEntity('user')
  @IsCUID()
  userId: string;

  @Length(GOAL_MIN_DESCRIPTION_LENGTH, GOAL_MAX_DESCRIPTION_LENGTH)
  @IsString()
  description: string;
}
