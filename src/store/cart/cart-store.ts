import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];
  getTotalProducts: () => number;
  addProductToCart: (product: CartProduct) => void;
  // updateductToCart: (product: CartProduct) => void;
  // removeProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist((set, get) => ({
    cart: [],
    getTotalProducts: () => {
      const { cart } = get();
      return cart.reduce((total, item) => total + item.quantity, 0)
    },
    addProductToCart: (product: CartProduct) => {
      const { cart } = get();
      const addPoductInCart = cart.some(({ id, size }) => id === product.id && size === product.size);
      if (!addPoductInCart) {
        set({ cart: [...cart, product] })
        return;
      }

      const updateProductInCart = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: item.quantity + product.quantity }
        }
        return item;

      })
      set({ cart: updateProductInCart })
    },
    // closeSideMenu: () => set({ isSideMenuOpen: false }),
  }), { name: "shopping-cart" })
);