import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsCUID } from 'shared/validation';
import { IsExistingUser } from 'user/validation';
import { UpdateGoalDto } from './update-goal.dto';

export class CreateGoalDto extends UpdateGoalDto {
  @IsExistingUser()
  @IsCUID()
  userId: string;
}
