"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LoandingCartProduct } from "@/components";
import { currencyFormmat } from "@/utils";

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
            <span>
              <p>
                {product.size} - {product.title} (x{product.quantity})
              </p>
            </span>
            <p className="font-bold">
              {currencyFormmat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
