import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cartItems: [],

      // Computed values
      getCartCount: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      getCartTotal: () =>
        get().cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),

      // Actions
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addItemToCart: (productToAdd) =>
        set((state) => {
          const existingCartItem = state.cartItems.find(
            (cartItem) => cartItem.id === productToAdd.id
          );

          if (existingCartItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === productToAdd.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }

          return {
            cartItems: [...state.cartItems, { ...productToAdd, quantity: 1 }],
          };
        }),

      removeItemFromCart: (productToRemove) =>
        set((state) => {
          const existingCartItem = state.cartItems.find(
            (cartItem) => cartItem.id === productToRemove.id
          );

          if (existingCartItem.quantity === 1) {
            return {
              cartItems: state.cartItems.filter(
                (cartItem) => cartItem.id !== productToRemove.id
              ),
            };
          }

          return {
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          };
        }),

      clearItemFromCart: (cartItemToClear) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToClear.id
          ),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

export default useCartStore;
