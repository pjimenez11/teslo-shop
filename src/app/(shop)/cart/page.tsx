"use client";

import { QuantitySelector, Title } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    redirect("/empty");
  }

  const onQuantityChange = (id: string, size: string, quantity: number) => {
    // updateProductQuantity(id, size, quantity);
  };

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {cart.map((product) => (
              <div
                key={`${product.slug} - ${product.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${product.image}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>
                    {product.size} - {product.title}
                  </p>
                  <p>${product.price}</p>
{/*                   <QuantitySelector quantity={product.quantity} />
 */}                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-min">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
