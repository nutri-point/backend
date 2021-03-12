import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';
import { IsExistingEntity } from 'validation';

export class UpdateUserDto {
  @IsExistingEntity('role', 'number')
  @IsPositive()
  @Type(() => Number)
  roleId: number;
}
