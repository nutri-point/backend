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
import { ResultService } from 'services';
import { CreateResultDto, UpdateResultDto } from 'dtos';
import { FindByUserParams } from './params/find-by-user.params';

@ApiTags('Result')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Role(RoleRank.Admin)
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Role(RoleRank.User)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Role(RoleRank.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id')
  findByUserId(@Param() params: FindByUserParams) {
    return this.resultService.findByUserId(params.id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(id, updateResultDto);
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(id);
  }
}
