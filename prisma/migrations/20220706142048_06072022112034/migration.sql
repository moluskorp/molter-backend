/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Ncm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ncm_code_key" ON "Ncm"("code");
