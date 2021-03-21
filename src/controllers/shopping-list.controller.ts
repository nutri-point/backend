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
import { ShoppingListService } from 'services';
import {
  CreateShoppingListWithItemsDto,
  UpdateShoppingListWithItemsDto,
} from 'dtos';
import { FindByUserParams } from './params/find-by-user.params';

@ApiTags('ShoppingList')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('shoppingList')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Role(RoleRank.Admin)
  @Post()
  create(
    @Body() createShoppingListWithItemsDto: CreateShoppingListWithItemsDto,
  ) {
    return this.shoppingListService.createWithItems(
      createShoppingListWithItemsDto,
    );
  }

  @Role(RoleRank.User)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.shoppingListService.findAll();
  }

  // TODO: Add validation on findOne endpoints similar the one inside FindByUserParams
  // to check if entity with the ID exists and if it belongs to the user
  @Role(RoleRank.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListService.findOne(id);
  }

  @Role(RoleRank.User)
  @Get('/latest')
  findLatest() {
    return this.shoppingListService.findLatest();
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id')
  findByUserId(@Param() params: FindByUserParams) {
    return this.shoppingListService.findByUserId(params.id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Role(RoleRank.Admin)
  @Get('/user/:id/latest')
  findLatestByUserId(@Param() params: FindByUserParams) {
    return this.shoppingListService.findLatestByUserId(params.id);
  }

  @Role(RoleRank.Admin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListWithItemsDto: UpdateShoppingListWithItemsDto,
  ) {
    return this.shoppingListService.updateWithItems(
      id,
      updateShoppingListWithItemsDto,
    );
  }

  @Role(RoleRank.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListService.remove(id);
  }
}
