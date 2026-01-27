import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        // ============ State ============
        isCartOpen: false,
        cartItems: [],

        // ============ Getters ============
        getCartCount: () =>
          get().cartItems.reduce((total, item) => total + item.quantity, 0),

        getCartTotal: () =>
          get().cartItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          ),

        // ============ Actions ============
        actions: {
          toggleCart: () =>
            set((state) => ({ isCartOpen: !state.isCartOpen })),

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
                cartItems: [
                  ...state.cartItems,
                  { ...productToAdd, quantity: 1 },
                ],
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
        },
      }),
      {
        name: "cart-storage",
        partialize: (state) => ({
          cartItems: state.cartItems,
        }),
      }
    ),
    { name: "CartStore" }
  )
);

export default useCartStore;
