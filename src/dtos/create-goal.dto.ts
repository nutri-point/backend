import { IsCUID, IsExistingEntity } from 'validation';
import { UpdateGoalDto } from './update-goal.dto';

export class CreateGoalDto extends UpdateGoalDto {
  @IsExistingEntity('user')
  @IsCUID()
  userId: string;
}
