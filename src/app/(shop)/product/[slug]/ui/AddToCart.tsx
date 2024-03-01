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
  const [stock, setStock] = useState<number>(0);
  const [isLoanding, setIsLoanding] = useState(true);
  const [posted, setPosted] = useState(false);
  const { addProductToCart, cart } = useCartStore((state) => state);

  useEffect(() => {
    const getStock = async () => {
      const stockDb = await getStockBySlug(product.slug);
      setStock(stockDb);
      if (stockDb <= 0) {
        setQuantity(0);
      }
      setIsLoanding(false);
    };

    getStock();
  }, [product.slug]);

  const addToCart = () => {
    if (stock <= 0) return;
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
        stock={stock}
        isLoading={isLoanding}
      />

      <button
        className={clsx("text-white py-2 px-4 rounded transition-all my-5", {
          "bg-slate-400": isLoanding || stock <= 0,
          "bg-blue-600 hover:bg-blue-800": !isLoanding && stock > 0,
        })}
        disabled={isLoanding || stock <= 0}
        onClick={() => addToCart()}
      >
        Agregar al carrito
      </button>
    </>
  );
};
