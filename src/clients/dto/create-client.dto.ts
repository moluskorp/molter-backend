type Address = {
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
};

type Contact = {
  type: string;
  value: string;
};

export class CreateClientDto {
  name: string;
  nickname: string;
  cpf: string;
  rg: string;
  address: Address;
  limit?: number;
  type: string;
  contacts?: Contact[];
  email?: string;
  birthday?: Date;
  finalConsumer: boolean;
}
