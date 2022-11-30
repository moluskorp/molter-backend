export class CreateTaxDto {
  ncm: string;
  taxNature: string;
  taxedPercentage?: number;
  taxedReductionPercentage?: number;
  hasIpi: boolean;
  cstIpi: string;
  ipiPercentage?: number;
  pisCofinsNature: string;
  fcpPercentage?: number;
}
