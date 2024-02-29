"use server";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const productSock = await prisma.product.findUnique({
      select: { inStock: true },
      where: { slug: slug },
    });
    return productSock?.inStock || 0;
  } catch (error) {
    throw new Error("Error al optener el stock del producto");
  }
};
