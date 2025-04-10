/*
  Warnings:

  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_items_id_seq";
