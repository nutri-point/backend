import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'services';
import { UpdateUserDto } from 'dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RoleGuard } from 'auth/roles/role.guard';
import { Role } from 'auth/roles/role.decorator';
import { RoleRank } from 'auth/roles/role.enum';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(RoleRank.User)
  @Get('me')
  me() {
    return this.userService.me();
  }

  @Role(RoleRank.User)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Role(RoleRank.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
