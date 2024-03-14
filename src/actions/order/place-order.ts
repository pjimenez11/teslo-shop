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
  console.time("placeOrder3");
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

  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. Actualizar el stock de los productos

    // 2. Crear la orden - Encabezado - Detalle
    const order = await tx.order.create({
      data: {
        userId: userId,
        total: total,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        isPaid: false,
        OrderItem: {
            createMany: {
                data: productIds
            },
            }
        }
      },
    });

    // 3. Crear la direccion de la orden

    return { orden: "1234", updatedProducts: [], address: {} };
  });

  console.log("Ending timer for: placeOrder3");
  console.timeEnd("placeOrder3");
};
