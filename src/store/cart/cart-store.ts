import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];
  getTotalProducts: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateductToCart: (product: CartProduct, quantity: number) => void;
  removeProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist((set, get) => ({
    cart: [],
    getTotalProducts: () => {
      const { cart } = get();
      return cart.reduce((total, item) => total + item.quantity, 0)
    },
    getSummaryInformation: () => {
      const { cart } = get();

      const subTotal = cart.reduce(
        (subTotal, product) => product.quantity * product.price + subTotal,
        0
      );
      const tax = subTotal * 0.15;
      const total = subTotal + tax;
      const itemsInCart = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        subTotal,
        tax,
        total,
        itemsInCart,
      };
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
    updateductToCart: (product: CartProduct, quantity: number) => {
      const { cart } = get();
      const updateProductInCart = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: quantity }
        }
        return item;

      })
      set({ cart: updateProductInCart })
    },
    removeProductToCart: (product: CartProduct) => {
      const { cart } = get();

      const updateProductInCart = cart.filter((item) => item.id !== product.id || item.size !== product.size);
      set({ cart: updateProductInCart })
    },
    // closeSideMenu: () => set({ isSideMenuOpen: false }),
  }), { name: "shopping-cart" })
);