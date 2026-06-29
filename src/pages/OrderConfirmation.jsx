import { useNavigate } from "react-router-dom";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const orderForm = JSON.parse(sessionStorage.getItem("orderForm") || "{}");
  const orderSummary = JSON.parse(sessionStorage.getItem("orderSummary") || "{}");

  const { cart = [], sousTotal = 0, shippingCost = 0, grandTotal = 0, country } = orderSummary;
  const { forOther } = orderForm;

  const handleConfirm = () => {
    // Envoie WhatsApp
    const lignes = cart.map(
      (item) =>
        `• ${item.name} x${Number(item.quantity)} — ${(Number(item.price) * Number(item.quantity)).toLocaleString("fr-FR")} FCFA`
    );

    const destinataire = forOther
      ? `\n👥 *Destinataire :* ${orderForm.dest_prenom} ${orderForm.dest_nom}\n📞 ${orderForm.dest_telephone}\n📍 ${orderForm.dest_adresse}`
      : "";

    const message =
      `🛍️ *Nouvelle commande Carmi Fashion*\n\n` +
      lignes.join("\n") +
      `\n\n━━━━━━━━━━━━━━━\n` +
      `👤 *Client :* ${orderForm.prenom} ${orderForm.nom}\n` +
      `📞 ${orderForm.telephone}\n` +
      `📍 ${orderForm.commune}, ${orderForm.quartier}\n` +
      `🏠 ${orderForm.adresse}\n` +
      (orderForm.date_livraison ? `📅 Livraison : ${orderForm.date_livraison}` : "") +
      (orderForm.heure_livraison ? ` à ${orderForm.heure_livraison}` : "") +
      destinataire +
      `\n\n🧾 Sous-total : ${Number(sousTotal).toLocaleString("fr-FR")} FCFA\n` +
      `🚚 Livraison (${country?.flag} ${country?.name}) : ${Number(shippingCost).toLocaleString("fr-FR")} FCFA\n` +
      `💰 *Total : ${Number(grandTotal).toLocaleString("fr-FR")} FCFA*\n\n` +
      `Merci de confirmer ma commande 🙏`;

    window.open(
      `https://wa.me/2250574326131?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    navigate("/order-success");
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <button className="back-home-btn" onClick={() => navigate("/order-form")}>
          ← Retour
        </button>
        <h1 className="order-title">✅ Confirmation de commande</h1>
      </div>

      {/* ── RÉCAP COMMANDE ── */}
      <div className="order-recap-box">
        <h3>🛍️ Articles commandés</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-recap-line">
            <span>{item.name} × {Number(item.quantity)}</span>
            <span>{(Number(item.price) * Number(item.quantity)).toLocaleString("fr-FR")} FCFA</span>
          </div>
        ))}
        <div className="order-recap-line order-recap-sub">
          <span>Sous-total</span>
          <span>{Number(sousTotal).toLocaleString("fr-FR")} FCFA</span>
        </div>
        <div className="order-recap-line order-recap-sub">
          <span>Livraison ({country?.flag} {country?.name})</span>
          <span>{Number(shippingCost).toLocaleString("fr-FR")} FCFA</span>
        </div>
        <div className="order-recap-line order-recap-total">
          <span>Total</span>
          <span>{Number(grandTotal).toLocaleString("fr-FR")} FCFA</span>
        </div>
      </div>

      {/* ── INFOS CLIENT ── */}
      <div className="order-recap-box">
        <h3>👤 Vos informations</h3>
        <div className="confirm-info-grid">
          <span className="confirm-label">Nom complet</span>
          <span>{orderForm.prenom} {orderForm.nom}</span>
          <span className="confirm-label">Téléphone</span>
          <span>{orderForm.telephone}</span>
          {orderForm.email && <><span className="confirm-label">Email</span><span>{orderForm.email}</span></>}
          <span className="confirm-label">Commune</span>
          <span>{orderForm.commune}</span>
          <span className="confirm-label">Quartier</span>
          <span>{orderForm.quartier}</span>
          <span className="confirm-label">Adresse</span>
          <span>{orderForm.adresse}</span>
          {orderForm.date_livraison && <><span className="confirm-label">Date souhaitée</span><span>{orderForm.date_livraison}</span></>}
          {orderForm.heure_livraison && <><span className="confirm-label">Heure souhaitée</span><span>{orderForm.heure_livraison}</span></>}
          {orderForm.notes && <><span className="confirm-label">Notes</span><span>{orderForm.notes}</span></>}
        </div>
      </div>

      {/* ── DESTINATAIRE ── */}
      {forOther && (
        <div className="order-recap-box">
          <h3>👥 Destinataire</h3>
          <div className="confirm-info-grid">
            <span className="confirm-label">Nom complet</span>
            <span>{orderForm.dest_prenom} {orderForm.dest_nom}</span>
            <span className="confirm-label">Téléphone</span>
            <span>{orderForm.dest_telephone}</span>
            <span className="confirm-label">Adresse</span>
            <span>{orderForm.dest_adresse}</span>
          </div>
        </div>
      )}

      <button className="order-submit-btn" onClick={handleConfirm}>
        ✅ Confirmer ma commande
      </button>
    </div>
  );
}