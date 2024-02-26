import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //1. Borrar todos los datos de la base de datos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;

  //2. Insertar datos iniciales
  const categoriesData = categories.map((categorie) => ({
    name: categorie,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDb = await prisma.category.findMany();

  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  const { images, type, ...product1 } = products[0];

  await prisma.product.create({
    data: { ...product1, categoryId: categoriesMap[type] },
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production")
    throw new Error("Seed no debe ejecutarse en produccion");

  main();
})();
