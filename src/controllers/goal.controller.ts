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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'auth/roles/role.guard';
import { Role } from 'auth/roles/role.decorator';
import { RoleRank } from 'auth/roles/role.enum';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { GoalService } from 'services';
import { CreateGoalDto, UpdateGoalDto } from 'dtos';
import { FindByUserParams } from './params/find-by-user.params';

@ApiTags('Goal')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Role(RoleRank.Admin)
  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @Role(RoleRank.User)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Role(RoleRank.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(id);
  }

  @Role(RoleRank.User)
  @Get('/latest')
  findLatest() {
    return this.goalService.findLatest();
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id')
  findByUserId(@Param() params: FindByUserParams) {
    return this.goalService.findByUserId(params.id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id/latest')
  findLatestByUserId(@Param() params: FindByUserParams) {
    return this.goalService.findLatestByUserId(params.id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(id, updateGoalDto);
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(id);
  }
}
