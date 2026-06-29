import { useNavigate } from "react-router-dom";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderChoice() {
  const navigate = useNavigate();

  return (
    <div className="choice-page">
      <div className="choice-card">
        <h2 className="choice-title">📦 Finaliser ma commande</h2>
        <p className="choice-subtitle">
          Comment souhaitez-vous procéder ?
        </p>

        <div className="choice-options">

          {/* Option 1 — S'inscrire */}
          <div className="choice-option">
            <div className="choice-option-icon">🔐</div>
            <h3>S'inscrire / Se connecter</h3>
            <p>
              Créez un compte ou connectez-vous pour enregistrer
              vos informations et suivre vos commandes facilement.
            </p>
            <button
              className="choice-btn choice-btn-primary"
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </button>
            <button
              className="choice-btn choice-btn-secondary"
              onClick={() => navigate("/login")}
            >
              Déjà un compte ? Se connecter
            </button>
          </div>

          <div className="choice-divider">
            <span>ou</span>
          </div>

          {/* Option 2 — Continuer sans compte */}
          <div className="choice-option">
            <div className="choice-option-icon">📝</div>
            <h3>Continuer sans compte</h3>
            <p>
              Renseignez simplement vos informations de livraison
              pour finaliser votre commande.
            </p>
            <button
              className="choice-btn choice-btn-primary"
              onClick={() => navigate("/order-form")}
            >
              Remplir le formulaire
            </button>
          </div>

        </div>

        <button
          className="choice-back-btn"
          onClick={() => navigate("/cart")}
        >
          ← Retour au panier
        </button>
      </div>
    </div>
  );
}