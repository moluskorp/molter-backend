type Address = {
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

export class CreateStoreDto {
  name: string;
  nickname: string;
  cnpj: string;
  ie: string;
  pisPercentage?: number;
  cofinsPercentage?: number;
  address: Address;
  type: string;
  invoiceNumber: number;
  invoiceSerie: string;
}
