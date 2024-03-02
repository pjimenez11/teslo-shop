"use client";

import { useCartStore } from "@/store";
import { currencyFormmat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((store) =>
    store.getSumaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded)
    return (
      <>
        <div className="grid grid-cols-2 gap-1">
          <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
          <div className="flex justify-end">
            <span className="w-1/2 bg-gray-300 animate-pulse rounded">
              &nbsp;
            </span>
          </div>

          <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
          <div className="flex justify-end">
            <span className="w-1/2 bg-gray-300 animate-pulse rounded">
              &nbsp;
            </span>
          </div>

          <span className="bg-gray-300 animate-pulse rounded">&nbsp;</span>
          <div className="flex justify-end">
            <span className="w-1/2 bg-gray-300 animate-pulse rounded">
              &nbsp;
            </span>
          </div>
          <span className="mt-5 text-2xl bg-gray-300 rounded">&nbsp;</span>
          <div className="flex justify-end">
            <span className="w-1/2 mt-5 text-2xl bg-gray-300 animate-pulse rounded">
              &nbsp;
            </span>
          </div>
        </div>
        <div className="mt-5 mb-2 w-full bg-gray-300 rounded h-10">&nbsp;</div>
      </>
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormmat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right"> {currencyFormmat(tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormmat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <Link
          className="flex btn-primary justify-center"
          href="checkout/address"
        >
          Checkout
        </Link>
      </div>
    </>
  );
};
