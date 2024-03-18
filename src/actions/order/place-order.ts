"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario activa.",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  if (products.length !== productIds.length) {
    return {
      ok: false,
      message: "No se encontraron todos los productos.",
    };
  }

  if (products.length === 0) {
    return {
      ok: false,
      message: "No hay productos en la orden.",
    };
  }

  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0
  );

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error("Producto no encontrado - 500");

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (p) => {
        const productQuantity = productIds
          .filter((pi) => pi.productId === p.id)
          .reduce((acc, pi) => acc + pi.quantity, 0);

          console.log("productQuantity", productQuantity);
        if (productQuantity <= 0) {
          throw new Error(`${p.id} no tiene cantidad válida.`);
        }

        return tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((p) => {
        if (p.inStock < 0) {
          console.log(p);
          throw new Error(`${p.title} no tiene suficiente stock.`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          total: total,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => {
                const price =
                  products.find((product) => product.id === p.productId)
                    ?.price || 0;
                if (price === 0) {
                  throw new Error("El precio del producto no puede ser cero");
                }
                return {
                  productId: p.productId,
                  quantity: p.quantity,
                  size: p.size,
                  price: price,
                };
              }),
            },
          },
        },
      });

      // 3. Crear la direccion de la orden

      const orderAddress = await tx.orderAddress.create({
        data: {
          orderId: order.id,
          address: address.address,
          address2: address.address2,
          city: address.city,
          countryId: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          phone: address.phone,
          postalCode: address.postalCode,
        },
      });

      return { order, updatedProducts, orderAddress };
    });
    
    return {
      ok: true,
      message: "Orden procesada con éxito",
      order: prismaTx.order,
      prismaTx
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error?.message || "Error al procesar la orden",
    };
  }

};
