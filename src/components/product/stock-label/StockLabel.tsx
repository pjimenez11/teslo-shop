"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoanding, setIsLoanding] = useState(true);
  useEffect(() => {
    const getStock = async () => {
      const stockDb = await getStockBySlug(slug);
      setStock(stockDb);
      setIsLoanding(false);
    };

    getStock(); // Define getStock inside useEffect to include it as a dependency
  }, [slug]);

  return (
    <>
      <h1 className={` ${titleFont.className} font-bold text-lg`}>
          Stock: {isLoanding ? "..." : stock}
        </h1>
    </>
  );
};
