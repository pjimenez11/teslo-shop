"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";
import { QuantitySelector } from "../../../../components/product/quantity-selector/QuantitySelector";
import { useEffect, useState } from "react";
import { LoandingCartProduct } from "@/components";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded)
    return (
      <div>
        <LoandingCartProduct />
        <LoandingCartProduct />
        <LoandingCartProduct />
      </div>
    );

  if (productsInCart.length === 0) {
    redirect("/empty");
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex mb-5">
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
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(value) => console.log(value)}
            />

            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
