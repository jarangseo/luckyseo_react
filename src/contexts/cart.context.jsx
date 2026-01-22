import { createContext, useState, useContext } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <CartContext.Provider value={{ isCartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
