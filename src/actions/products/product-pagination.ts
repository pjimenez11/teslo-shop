import prisma from "@/lib/prisma";
("use server");

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    console.log(products);
  } catch (error) {}
};
