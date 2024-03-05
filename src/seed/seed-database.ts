import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //1. Borrar todos los datos de la base de datos

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  //2. Insertar datos iniciales

  await prisma.user.createMany({ data: users });

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

  products.forEach(async (product) => {
    const { images, type, ...res } = product;
    const productDb = await prisma.product.create({
      data: { ...res, categoryId: categoriesMap[type] },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: productDb.id,
    }));

    await prisma.productImage.createMany({ data: imagesData });
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production")
    throw new Error("Seed no debe ejecutarse en produccion");

  main();
})();
