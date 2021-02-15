import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';
import { IsExistingRole } from 'user/validation';

export class UpdateUserDto {
  @Type(() => Number)
  @IsExistingRole()
  @IsPositive()
  roleId: number;
}
