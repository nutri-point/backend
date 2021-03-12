import { PartialType } from '@nestjs/swagger';
import { CreateMealComponentDto } from './create-meal-component.dto';

export class UpdateMealComponentDto extends PartialType(
  CreateMealComponentDto,
) {}
