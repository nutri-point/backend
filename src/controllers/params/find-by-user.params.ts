import { IsCUID } from 'validation';
import { IsExistingUser } from 'validation';

export class FindByUserParams {
  @IsExistingUser()
  @IsCUID()
  id: string;
}
