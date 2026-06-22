import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../App.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </button>
        <h2 className="cart-title">🛒 Mon Panier</h2>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Votre panier est vide.</p>
          <button className="auth-btn" onClick={() => navigate("/")}>
            Voir les produits
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </p>
                <p className="cart-item-unit">
                  {item.price.toLocaleString()} FCFA / unité
                </p>
              </div>

              {/* Contrôle quantité */}
              <div className="cart-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Total + actions */}
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{totalPrice.toLocaleString()} FCFA</span>
            </div>

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Vider le panier
              </button>
              <button className="auth-btn">
                Passer la commande
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}