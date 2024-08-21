-- CreateTable
CREATE TABLE "TodoModel" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP,

    CONSTRAINT "TodoModel_pkey" PRIMARY KEY ("id")
);
