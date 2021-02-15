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
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindByUserParams } from './params/find-by-user.params';
import { RoleGuard } from 'auth/roles/role.guard';
import { Role } from 'auth/roles/role.decorator';
import { RoleRank } from 'auth/roles/role.enum';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

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

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id')
  findByUserId(@Param() params: FindByUserParams) {
    return this.goalService.findByUserId(params.id);
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
