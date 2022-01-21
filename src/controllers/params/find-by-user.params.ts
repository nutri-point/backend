import { IsCUID, IsExistingEntity } from 'validation';

export class FindByUserParams {
  @IsExistingEntity('user')
  @IsCUID()
  id: string;
}
