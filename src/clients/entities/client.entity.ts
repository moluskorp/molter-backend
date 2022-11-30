type Address = {
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

type Contact = {
  type: string;
  value: string;
};

export class Client {
  id: string;
  name: string;
  nickname: string;
  cpf: string;
  rg: string;
  address: Address;
  limit: number;
  type: string;
  contact: Contact[];
  email: string;
  birthday: string;
  active: boolean;
  finalConsumer: boolean;
  createdAt: Date;
  updatedAt: Date;
}
