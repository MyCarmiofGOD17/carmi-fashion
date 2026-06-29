import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderSummary = JSON.parse(sessionStorage.getItem("orderSummary") || "{}");
  const { country } = orderSummary;

  const handleContinue = () => {
    clearCart();
    sessionStorage.removeItem("orderForm");
    sessionStorage.removeItem("orderSummary");
    sessionStorage.removeItem("selectedCountry");
    navigate("/");
  };

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">Commande confirmée !</h1>

        <div className="success-message">
          <p>Votre commande a bien été enregistrée avec succès.</p>
          <p><strong>Merci de nous avoir fait confiance.</strong></p>
          <p>Votre commande sera traitée dans les plus brefs délais.</p>
        </div>

        <div className="success-delay">
          <span>⏱</span>
          <div>
            <strong>Délai estimatif de livraison</strong>
            <p>
              {country?.delay
                ? `${country.delay} pour ${country.name}.`
                : "Entre 24h et 48h pour Abidjan."}
            </p>
          </div>
        </div>

        <div className="success-conditions">
          <h4>📋 Conditions de livraison</h4>
          <ul>
            <li>Les délais sont calculés à partir de la confirmation de commande.</li>
            <li>Un numéro de suivi vous sera communiqué après expédition.</li>
            <li>Chaque colis est soigneusement emballé aux couleurs de Carmi Fashion.</li>
            <li>Nous vous contacterons si nécessaire avant la livraison.</li>
          </ul>
        </div>

        <div className="success-contact">
          <p>Pour toute question, contactez-nous :</p>
          <a href="tel:+2250574326131" className="success-phone">
            📞 +225 05 74 32 61 31
          </a>
        </div>

        <button className="auth-btn" onClick={handleContinue}>
          🛍️ Continuer mes achats
        </button>
      </div>
    </div>
  );
}