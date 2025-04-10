-- CreateTable
CREATE TABLE "user_addresses" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "street" TEXT NOT NULL,
    "apt" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_addresses_phone_key" ON "user_addresses"("phone");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
