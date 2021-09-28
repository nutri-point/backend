import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { Role } from 'auth/roles/role.decorator';
import { RoleRank } from 'auth/roles/role.enum';
import { RoleGuard } from 'auth/roles/role.guard';
import { CreateMealDto, UpdateMealDto } from 'dtos';
import { MealService } from 'services';

@ApiTags('Meal')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Role(RoleRank.Admin)
  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Role(RoleRank.Member)
  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  @Role(RoleRank.Member)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, updateMealDto);
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }
}
