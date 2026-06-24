import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SHIPPING_COUNTRIES } from "../data/shipping";
import "../App.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [selectedCountry, setSelectedCountry] = useState("CI");

  const country = SHIPPING_COUNTRIES.find((c) => c.code === selectedCountry);
  const shippingCost = country ? country.price : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleCommande = () => {
    if (cart.length === 0) return;

    const lignes = cart.map(
      (item) =>
        `• ${item.name} x${item.quantity} — ${(Number(item.price) * item.quantity).toLocaleString("fr-FR")} FCFA`
    );

    const message =
      `🛍️ *Nouvelle commande Carmi Fashion*\n\n` +
      lignes.join("\n") +
      `\n\n━━━━━━━━━━━━━━━\n` +
      `🧾 Sous-total : ${totalPrice.toLocaleString("fr-FR")} FCFA\n` +
      `🚚 Livraison (${country.flag} ${country.name}) : ${shippingCost === 0 ? "Gratuite" : `${shippingCost.toLocaleString("fr-FR")} FCFA`}\n` +
      `💰 *Total : ${grandTotal.toLocaleString("fr-FR")} FCFA*\n` +
      `⏱ Délai estimé : ${country.delay}\n\n` +
      `Merci de confirmer ma commande 🙏`;

    const url = `https://wa.me/2250574326131?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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

          {/* ── LISTE DES ARTICLES ── */}
          {cart.map((item) => {
            const prix = Number(item.price);
            const sousTotal = prix * item.quantity;

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  {/* Prix total qui augmente avec la quantité */}
                  <p className="cart-item-price">
                    {sousTotal.toLocaleString("fr-FR")} FCFA
                  </p>
                  {/* Prix unitaire fixe */}
                  <p className="cart-item-unit">
                    {prix.toLocaleString("fr-FR")} FCFA / unité
                  </p>
                </div>

                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                  ✕
                </button>
              </div>
            );
          })}

          {/* ── LIVRAISON ── */}
          <div className="shipping-selector">
            <h3 className="shipping-selector-title">🚚 Pays de livraison</h3>

            <select
              className="shipping-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {SHIPPING_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} — {c.price === 0 ? "Gratuit" : `${c.price.toLocaleString("fr-FR")} FCFA`}
                </option>
              ))}
            </select>

            {country && (
              <div className="shipping-info-box">
                <span>⏱ Délai estimé : <strong>{country.delay}</strong></span>
                <span>
                  💰 Frais : <strong>
                    {shippingCost === 0 ? "Gratuit ✅" : `${shippingCost.toLocaleString("fr-FR")} FCFA`}
                  </strong>
                </span>
                <button
                  className="shipping-detail-link"
                  onClick={() => navigate("/shipping")}
                >
                  Voir tous les tarifs →
                </button>
              </div>
            )}
          </div>

          {/* ── RÉCAPITULATIF ── */}
          <div className="cart-footer">
            <div className="cart-totals">

              {/* Détail de chaque produit */}
              <div className="cart-recap">
                <p className="cart-recap-title">📋 Récapitulatif</p>
                {cart.map((item) => {
                  const prix = Number(item.price);
                  return (
                    <div key={item.id} className="cart-recap-line">
                      <span className="cart-recap-name">
                        {item.name}
                        <span className="cart-recap-qty"> × {item.quantity}</span>
                      </span>
                      <span className="cart-recap-amount">
                        {(prix * item.quantity).toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Sous-total */}
              <div className="cart-total-line">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString("fr-FR")} FCFA</span>
              </div>

              {/* Livraison */}
              <div className="cart-total-line">
                <span>Livraison</span>
                <span>
                  {shippingCost === 0
                    ? "Gratuite ✅"
                    : `${shippingCost.toLocaleString("fr-FR")} FCFA`}
                </span>
              </div>

              {/* Total final */}
              <div className="cart-total cart-grand-total">
                <span>Total</span>
                <span>{grandTotal.toLocaleString("fr-FR")} FCFA</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Vider le panier
              </button>
              <button className="auth-btn" onClick={handleCommande}>
                📲 Passer la commande
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}