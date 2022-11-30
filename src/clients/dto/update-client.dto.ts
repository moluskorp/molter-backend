import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
type Contact = {
  id: string;
  type: string;
  value: string;
};

export class UpdateClientDto extends PartialType(CreateClientDto) {
  contacts?: Contact[];
  addressId: string;
  active?: boolean;
}
