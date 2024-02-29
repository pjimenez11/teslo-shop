"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onValidateQuantity = (value: number) => {
    if (quantity + value < 1) return;
    if (quantity + value > 10) return;
    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValidateQuantity(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 flex justify-center items-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValidateQuantity(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
