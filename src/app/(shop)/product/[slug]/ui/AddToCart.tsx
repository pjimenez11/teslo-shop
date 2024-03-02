"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const CartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(CartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <p className="text-red-500 mt-2 fade-in transition-all ">
          Debes seleccionar una talla
        </p>
      )}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSelectSize={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button className="btn-primary my-5" onClick={() => addToCart()}>
        Agregar al carrito
      </button>
    </>
  );
};
