import { IsCUID, IsExistingEntity } from 'validation';

export class CreateShoppingListDto {
  @IsExistingEntity('user')
  @IsCUID()
  userId: string;

  @IsExistingEntity('shoppingListItem', 'string', { each: true })
  @IsCUID({ each: true })
  items: string[];
}
