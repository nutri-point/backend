import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateMealComponentDto, UpdateMealComponentDto } from 'dtos';
import { MealComponentService } from 'services';

@Controller('mealComponent')
export class MealComponentController {
  constructor(private readonly mealComponentService: MealComponentService) {}

  @Post()
  create(@Body() createMealComponentDto: CreateMealComponentDto) {
    return this.mealComponentService.create(createMealComponentDto);
  }

  @Get()
  findAll() {
    return this.mealComponentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealComponentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealComponentDto,
  ) {
    return this.mealComponentService.update(id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealComponentService.remove(id);
  }
}
