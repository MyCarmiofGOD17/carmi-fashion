import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

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

  const addToCart = (product, options = {}) => {
    const { size = null, color = null, quantity = 1 } = options;

    // Identifiant unique par variante
    const variantId = size || color
      ? `${product.id}-${size || "default"}-${color || "default"}`
      : product.id;

    const qty = Number(quantity);

    setCart((prev) => {
      const existing = prev.find((item) => item.variantId === variantId);
      if (existing) {
        // Ajoute la quantité sélectionnée à celle déjà présente
        return prev.map((item) =>
          item.variantId === variantId
            ? normalize({ ...item, quantity: item.quantity + qty })
            : item
        );
      }
      // Nouveau produit — ajoute avec la quantité sélectionnée
      return [
        ...prev,
        normalize({
          ...product,
          variantId,
          size,
          color,
          quantity: qty,
        }),
      ];
    });
  };

  const removeFromCart = (variantId) => {
    setCart((prev) => prev.filter((item) => (item.variantId || item.id) !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    const q = Number(quantity);
    if (q <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.variantId || item.id) === variantId
          ? normalize({ ...item, quantity: q })
          : item
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