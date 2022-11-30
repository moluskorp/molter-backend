/*
  Warnings:

  - You are about to drop the column `contactId` on the `Client` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_contactId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "contactId";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
