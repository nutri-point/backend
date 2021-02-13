-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(25) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" VARCHAR(200) NOT NULL,
    "lastName" VARCHAR(200) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "refreshTokenHash" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" VARCHAR(25) NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" VARCHAR(25) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "menuId" VARCHAR(25),
    "recipe" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealComponent" (
    "id" VARCHAR(25) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "calories" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION NOT NULL,
    "bodyFatPercent" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" VARCHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingListItem" (
    "id" VARCHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MealToMealComponent" (
    "A" VARCHAR(25) NOT NULL,
    "B" VARCHAR(25) NOT NULL
);

-- CreateTable
CREATE TABLE "_ShoppingListToShoppingListItem" (
    "A" VARCHAR(25) NOT NULL,
    "B" VARCHAR(25) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MealToMealComponent_AB_unique" ON "_MealToMealComponent"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToMealComponent_B_index" ON "_MealToMealComponent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ShoppingListToShoppingListItem_AB_unique" ON "_ShoppingListToShoppingListItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ShoppingListToShoppingListItem_B_index" ON "_ShoppingListToShoppingListItem"("B");

-- AddForeignKey
ALTER TABLE "Goal" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMealComponent" ADD FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMealComponent" ADD FOREIGN KEY ("B") REFERENCES "MealComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShoppingListToShoppingListItem" ADD FOREIGN KEY ("A") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShoppingListToShoppingListItem" ADD FOREIGN KEY ("B") REFERENCES "ShoppingListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
