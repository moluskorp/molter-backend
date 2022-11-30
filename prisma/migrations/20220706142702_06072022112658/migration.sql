/*
  Warnings:

  - Changed the type of `taxNature` on the `Taxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pisCofinsnature` on the `Taxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Taxes" DROP COLUMN "taxNature",
ADD COLUMN     "taxNature" TEXT NOT NULL,
DROP COLUMN "pisCofinsnature",
ADD COLUMN     "pisCofinsnature" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PisCofinsNatures";

-- DropEnum
DROP TYPE "TaxNatures";
