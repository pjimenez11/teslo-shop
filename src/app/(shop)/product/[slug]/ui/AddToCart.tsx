"use client";

import { getStockBySlug } from "@/actions";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const { addProductToCart, cart } = useCartStore((state) => state);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    addProductToCart({
      id: product.id,
      size: size,
      quantity: quantity,
      image: product.images[0],
      price: product.price,
      slug: product.slug,
      title: product.title,
    } as CartProduct);
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

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <button
        className="btn-primary my-5"
        onClick={() => addToCart()}
      >
        Agregar al carrito
      </button>
    </>
  );
};
