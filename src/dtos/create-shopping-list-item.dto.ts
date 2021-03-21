import { IsString, MaxLength } from 'class-validator';
import { SHOPPING_LIST_ITEM_MAX_NAME_LENGTH } from './constants';

export class CreateShoppingListItemDto {
  @MaxLength(SHOPPING_LIST_ITEM_MAX_NAME_LENGTH)
  @IsString()
  name: string;
}
