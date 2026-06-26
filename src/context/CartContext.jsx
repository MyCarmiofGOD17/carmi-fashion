import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Normalise un item — force price et quantity en Number
const normalize = (item) => ({
  ...item,
  price: Number(item.price),
  quantity: Number(item.quantity),
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("carmi_cart");
      return saved ? JSON.parse(saved).map(normalize) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carmi_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? normalize({ ...item, quantity: item.quantity + 1 })
            : item
        );
      }
      return [...prev, normalize({ ...product, quantity: 1 })];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const q = Number(quantity);
    if (q <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? normalize({ ...item, quantity: q }) : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("carmi_cart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}