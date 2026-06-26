import { useNavigate } from "react-router-dom";
import { SHIPPING_COUNTRIES } from "../data/shipping";
import "../App.css";
import "./ShippingPage.css";

const ZONES = ["Local", "Afrique", "Europe", "Amérique", "Asie"];

export default function ShippingPage() {
  const navigate = useNavigate();

  return (
    <div className="shipping-page">

      <div className="shipping-header">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </button>
        <h1 className="shipping-title">🚚 Livraison internationale</h1>
        <p className="shipping-subtitle">
          Carmi Fashion livre dans 14 pays. Retrouvez ci-dessous les tarifs
          et délais estimés selon votre destination. Nos frais reflètent
          l'excellence et le soin apportés à chaque expédition.
        </p>
      </div>

      {ZONES.map((zone) => {
        const countries = SHIPPING_COUNTRIES.filter((c) => c.zone === zone);
        return (
          <div key={zone} className="shipping-zone">
            <h2 className="shipping-zone-title">{zone}</h2>

            <div className="shipping-table">
              <div className="shipping-table-header">
                <span>Pays</span>
                <span>Délai estimé</span>
                <span>Frais de livraison</span>
              </div>

              {countries.map((country) => (
                <div key={country.code} className="shipping-table-row">
                  <span className="shipping-country">
                    {country.flag} {country.name}
                  </span>
                  <span className="shipping-delay">⏱ {country.delay}</span>
                  <span className="shipping-price">
                    {country.price.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="shipping-note">
        <h3>📋 Informations importantes</h3>
        <ul>
          <li>Les délais sont estimés à partir de la confirmation de commande.</li>
          <li>Les frais de livraison sont calculés par commande, peu importe le nombre d'articles.</li>
          <li>La livraison en Côte d'Ivoire est assurée en <strong>24h – 48h</strong> pour <strong>15 000 FCFA</strong>.</li>
          <li>Un numéro de suivi vous sera communiqué après l'expédition.</li>
          <li>Chaque colis est soigneusement emballé aux couleurs de Carmi Fashion.</li>
          <li>Pour toute question : <a href="tel:+2250574326131">+225 05 74 32 61 31</a></li>
        </ul>
      </div>

      <button className="auth-btn shipping-cta" onClick={() => navigate("/")}>
        🛍️ Voir les produits
      </button>

    </div>
  );
}