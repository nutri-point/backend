import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';
import { IsExistingRole } from 'validation';

export class UpdateUserDto {
  @IsExistingRole()
  @IsPositive()
  @Type(() => Number)
  roleId: number;
}
