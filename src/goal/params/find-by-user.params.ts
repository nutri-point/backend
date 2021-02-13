import { IsCUID } from 'shared/validation';
import { IsExistingUser } from 'user/validation';

export class FindByUserParams {
  @IsExistingUser()
  @IsCUID()
  id: string;
}
