"use client";

import { useEffect, useState } from "react";
import { LoadingPlaceOrder } from "./LoadingPlaceOrder";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <LoadingPlaceOrder />;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-min">
      <h2 className="text-2xl  mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">Patricio Jimenez</p>
        <p>Av. Atahualpa y Rio Coca</p>
        <p>Huachi Chico</p>
        <p>Ambato</p>
        <p>AM45153</p>
        <p>123.123.123</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
        <p className="mb-5">
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

        <button className="flex btn-primary justify-center">
          Colocar orden
        </button>
      </div>
    </div>
  );
};
