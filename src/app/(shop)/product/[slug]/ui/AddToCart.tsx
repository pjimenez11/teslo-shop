"use client";

import { getStockBySlug } from "@/actions";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [stock, setStock] = useState<number>(0);
  const [isLoanding, setIsLoanding] = useState(true);
  
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

  return (
    <>
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
      
      <button className="btn-primary my-5" disabled={isLoanding || stock <= 0}>Agregar al carrito</button>
    </>
  );
};
