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
import { CreateMealComponentDto, UpdateMealComponentDto } from 'dtos';
import { MealComponentService } from 'services';

@ApiTags('MealComponent')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
@Controller('mealComponent')
export class MealComponentController {
  constructor(private readonly mealComponentService: MealComponentService) {}

  @Role(RoleRank.Admin)
  @Post()
  create(@Body() createMealComponentDto: CreateMealComponentDto) {
    return this.mealComponentService.create(createMealComponentDto);
  }

  @Role(RoleRank.User)
  @Get()
  findAll() {
    return this.mealComponentService.findAll();
  }

  @Role(RoleRank.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealComponentService.findOne(id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealComponentDto,
  ) {
    return this.mealComponentService.update(id, updateMealDto);
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealComponentService.remove(id);
  }
}
