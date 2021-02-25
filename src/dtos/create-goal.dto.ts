import { IsCUID } from 'validation';
import { IsExistingUser } from 'validation';
import { UpdateGoalDto } from './update-goal.dto';

export class CreateGoalDto extends UpdateGoalDto {
  @IsExistingUser()
  @IsCUID()
  userId: string;
}
