import { IsCUID, IsExistingEntity } from 'validation';
import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';

export class CreateShoppingListWithItemsDto {
  @IsExistingEntity('user')
  @IsCUID()
  userId: string;

  items: CreateShoppingListItemDto[];
}
