import { useNavigate } from "react-router-dom";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Commande enregistrée !</h1>

        <div className="success-message">
          <p>Votre commande a bien été enregistrée avec succès.</p>
          <p>Merci pour votre confiance.</p>
          <p>Votre commande sera traitée dans les plus brefs délais.</p>
        </div>

        <div className="success-delay">
          <span>⏱</span>
          <div>
            <strong>Délai estimatif de livraison</strong>
            <p>Entre 24h et 48h pour Abidjan.<br />Délai variable selon votre pays de livraison.</p>
          </div>
        </div>

        <div className="success-contact">
          <p>Nous vous contacterons si nécessaire avant la livraison.</p>
          <a href="tel:+2250574326131" className="success-phone">
            📞 +225 05 74 32 61 31
          </a>
        </div>

        <button className="auth-btn" onClick={() => navigate("/")}>
          🛍️ Continuer mes achats
        </button>
      </div>
    </div>
  );
}