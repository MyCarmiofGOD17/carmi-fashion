import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SHIPPING_COUNTRIES } from "../data/shipping";
import "../App.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [selectedCountry, setSelectedCountry] = useState("CI");
  const [modified, setModified] = useState({});

  const sousTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity), 0
  );
  const country = SHIPPING_COUNTRIES.find((c) => c.code === selectedCountry);
  const shippingCost = country ? country.price : 0;
  const grandTotal = sousTotal + shippingCost;

  const handleChangeQty = (id, newQty) => {
    if (newQty <= 0) { removeFromCart(id); return; }
    updateQuantity(id, newQty);
    setModified((prev) => ({ ...prev, [id]: true }));
  };

  const handleRefresh = () => window.location.reload();

  const handleCommande = () => {
    if (cart.length === 0) return;

    // Sauvegarde le pays sélectionné pour la page de confirmation
    sessionStorage.setItem("selectedCountry", selectedCountry);

    // 1 — Ouvre WhatsApp
    const lignes = cart.map(
      (item) =>
        `• ${item.name} x${Number(item.quantity)} — ${(Number(item.price) * Number(item.quantity)).toLocaleString("fr-FR")} FCFA`
    );
    const message =
      `🛍️ *Nouvelle commande Carmi Fashion*\n\n` +
      lignes.join("\n") +
      `\n\n━━━━━━━━━━━━━━━\n` +
      `🧾 Sous-total : ${sousTotal.toLocaleString("fr-FR")} FCFA\n` +
      `🚚 Livraison (${country.flag} ${country.name}) : ${shippingCost.toLocaleString("fr-FR")} FCFA\n` +
      `💰 *Total : ${grandTotal.toLocaleString("fr-FR")} FCFA*\n` +
      `⏱ Délai estimé : ${country.delay}\n\n` +
      `Merci de confirmer ma commande 🙏`;

    window.open(
      `https://wa.me/2250574326131?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // 2 — Redirige vers la page de confirmation
    navigate("/order-confirmation");
  };

  const anyModified = Object.values(modified).some(Boolean);

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

          {cart.map((item) => {
            const prix = Number(item.price);
            const qte = Number(item.quantity);
            return (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{(prix * qte).toLocaleString("fr-FR")} FCFA</p>
                  <p className="cart-item-unit">{prix.toLocaleString("fr-FR")} FCFA / unité</p>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => handleChangeQty(item.id, qte - 1)}>−</button>
                  <span>{qte}</span>
                  <button onClick={() => handleChangeQty(item.id, qte + 1)}>+</button>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            );
          })}

          {/* Bouton rafraîchir global */}
          {anyModified && (
            <button className="refresh-global-btn" onClick={handleRefresh}>
              🔄 Mettre à jour le panier
            </button>
          )}

          {/* ── LIVRAISON ── */}
          <div className="shipping-selector">
            <h3 className="shipping-selector-title">🚚 Pays de livraison</h3>
            <select className="shipping-select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              {SHIPPING_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} — {c.price.toLocaleString("fr-FR")} FCFA
                </option>
              ))}
            </select>
            {country && (
              <div className="shipping-info-box">
                <span>⏱ Délai estimé : <strong>{country.delay}</strong></span>
                <span>💰 Frais : <strong>{shippingCost.toLocaleString("fr-FR")} FCFA</strong></span>
                <button className="shipping-detail-link" onClick={() => navigate("/shipping")}>
                  Voir tous les tarifs →
                </button>
              </div>
            )}
          </div>

          {/* ── RÉCAPITULATIF ── */}
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-recap">
                <p className="cart-recap-title">📋 Récapitulatif</p>
                {cart.map((item) => (
                  <div key={item.id} className="cart-recap-line">
                    <span className="cart-recap-name">
                      {item.name}
                      <span className="cart-recap-qty"> × {Number(item.quantity)}</span>
                    </span>
                    <span className="cart-recap-amount">
                      {(Number(item.price) * Number(item.quantity)).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                ))}
              </div>
              <div className="cart-total-line">
                <span>Sous-total</span>
                <span>{sousTotal.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="cart-total-line">
                <span>Livraison</span>
                <span>{shippingCost.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="cart-total cart-grand-total">
                <span>Total</span>
                <span>{grandTotal.toLocaleString("fr-FR")} FCFA</span>
              </div>
            </div>
            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>Vider le panier</button>
              <button className="auth-btn" onClick={handleCommande}>📲 Valider la commande</button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}