import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  //1. Borrar todos los datos de la base de datos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  //2. Insertar datos iniciales
  

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production")
    throw new Error("Seed no debe ejecutarse en produccion");

  main();
})();