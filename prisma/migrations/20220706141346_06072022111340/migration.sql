-- CreateEnum
CREATE TYPE "TaxNatures" AS ENUM ('SubstituicaoTributaria', 'Isento', 'Tributado');

-- CreateEnum
CREATE TYPE "PisCofinsNatures" AS ENUM ('Aliquota0', 'Monofasico', 'Tributado', 'Isento');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "cofinsPercentage" DOUBLE PRECISION,
ADD COLUMN     "pisPercentage" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Taxes" (
    "id" TEXT NOT NULL,
    "ncmId" TEXT NOT NULL,
    "taxNature" "TaxNatures" NOT NULL,
    "taxedPercentage" DOUBLE PRECISION,
    "taxedReductionPercentage" DOUBLE PRECISION,
    "hasIpi" BOOLEAN NOT NULL,
    "cstIpi" DOUBLE PRECISION,
    "ipiPercentage" DOUBLE PRECISION,
    "pisCofinsnature" "PisCofinsNatures" NOT NULL,
    "fcpPercentage" DOUBLE PRECISION,

    CONSTRAINT "Taxes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Taxes" ADD CONSTRAINT "Taxes_ncmId_fkey" FOREIGN KEY ("ncmId") REFERENCES "Ncm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
