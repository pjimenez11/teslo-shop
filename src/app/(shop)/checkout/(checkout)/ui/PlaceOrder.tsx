"use client";

import { useEffect, useState } from "react";
import { LoadingPlaceOrder } from "./LoadingPlaceOrder";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormmat } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { redirect, useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isCreateOrder, setIsCreateOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore((store) =>
    store.getSumaryInformation()
  );
  const cart = useCartStore((store) => store.cart);
  const clearCart = useCartStore((store) => store.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
    }

    if (resp.ok) {
      setIsCreateOrder(true);
      router.push(`/orders/${resp.order?.id}`);
      clearCart();
    }
  };

  if (!loaded) return <LoadingPlaceOrder />;

  if (!address.firstName) {
    redirect("/checkout/address");
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-min">
      <h2 className="text-2xl  mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2 gap-1">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}{" "}
        </span>

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
        <p className="mb-2">
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, acepta nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad.
            </a>
          </span>
        </p>

        <p className="text-red-500 mb-2 text-sm ">{errorMessage} &nbsp;</p>

        <button
          disabled={isPlacingOrder}
          className={clsx("flex w-full justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={() => onPlaceOrder()}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
