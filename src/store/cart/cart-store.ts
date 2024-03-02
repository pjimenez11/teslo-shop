import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist,  } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (id: string, size: string, quantity: number) => void;
  //removeProductFromCart:
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (id: string, size: string, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
    }),
    { name: "shopping-cart"}
  )
);
