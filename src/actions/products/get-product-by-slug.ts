"use server";

export const getProductBySlug = async (slug: string) => {

  try {
    const productData = await prisma?.product.findUnique({
      where: { slug },
      include: { ProductImage: { select: { url: true } } },
    });

    if (!productData) {
      return null;
    }

    return {
      product: {
        ...productData,
        images: productData.ProductImage.map((image) => image.url) ,
      },
    };
  } catch (error) {
    throw new Error("Error, no se pudo obtener el producto");
  }
};
