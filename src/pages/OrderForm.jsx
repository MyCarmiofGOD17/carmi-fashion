import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHIPPING_COUNTRIES } from "../data/shipping";
import "../App.css";
import "./OrderConfirmation.css";

const COUNTRY_FORM_DATA = {
  CI: {
    telephonePlaceholder: "+225 XX XX XX XX XX",
    communeLabel: "Commune",
    communePlaceholder: "Ex: Yopougon, Cocody, Plateau...",
    quartierLabel: "Quartier",
    quartierPlaceholder: "Ex: Selmer, Riviera, Zone 4...",
    adressePlaceholder: "Rue, bâtiment, point de repère...",
    emailPlaceholder: "votre@email.com",
  },
  MA: {
    telephonePlaceholder: "+212 XX XX XX XX XX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Casablanca, Rabat, Marrakech...",
    quartierLabel: "Quartier / Arrondissement",
    quartierPlaceholder: "Ex: Maarif, Guéliz, Hay Riad...",
    adressePlaceholder: "Numéro, rue, résidence, code postal...",
    emailPlaceholder: "votre@email.com",
  },
  GA: {
    telephonePlaceholder: "+241 XX XX XX XX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Libreville, Port-Gentil...",
    quartierLabel: "Quartier",
    quartierPlaceholder: "Ex: Akanda, Owendo, Nkembo...",
    adressePlaceholder: "Rue, bâtiment, point de repère...",
    emailPlaceholder: "votre@email.com",
  },
  NG: {
    telephonePlaceholder: "+234 XXX XXX XXXX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Lagos, Abuja, Kano...",
    quartierLabel: "Quartier / District",
    quartierPlaceholder: "Ex: Victoria Island, Lekki...",
    adressePlaceholder: "Street number, area, state...",
    emailPlaceholder: "your@email.com",
  },
  BJ: {
    telephonePlaceholder: "+229 XX XX XX XX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Cotonou, Porto-Novo...",
    quartierLabel: "Quartier",
    quartierPlaceholder: "Ex: Cadjehoun, Zogbohouè...",
    adressePlaceholder: "Rue, bâtiment, point de repère...",
    emailPlaceholder: "votre@email.com",
  },
  TG: {
    telephonePlaceholder: "+228 XX XX XX XX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Lomé, Kpalimé, Sokodé...",
    quartierLabel: "Quartier",
    quartierPlaceholder: "Ex: Bè, Tokoin, Adidogomé...",
    adressePlaceholder: "Rue, bâtiment, point de repère...",
    emailPlaceholder: "votre@email.com",
  },
  GH: {
    telephonePlaceholder: "+233 XX XXX XXXX",
    communeLabel: "City",
    communePlaceholder: "Ex: Accra, Kumasi, Tamale...",
    quartierLabel: "District / Area",
    quartierPlaceholder: "Ex: Osu, Labone, East Legon...",
    adressePlaceholder: "Street, building, landmark...",
    emailPlaceholder: "your@email.com",
  },
  FR: {
    telephonePlaceholder: "+33 X XX XX XX XX",
    communeLabel: "Ville",
    communePlaceholder: "Ex: Paris, Lyon, Marseille...",
    quartierLabel: "Code postal",
    quartierPlaceholder: "Ex: 75001, 69001, 13001...",
    adressePlaceholder: "Numéro, rue, appartement, code postal...",
    emailPlaceholder: "votre@email.fr",
  },
  TR: {
    telephonePlaceholder: "+90 XXX XXX XX XX",
    communeLabel: "Şehir (Ville)",
    communePlaceholder: "Ex: Istanbul, Ankara, İzmir...",
    quartierLabel: "Mahalle (Quartier)",
    quartierPlaceholder: "Ex: Beşiktaş, Kadıköy, Beyoğlu...",
    adressePlaceholder: "Sokak, bina numarası, posta kodu...",
    emailPlaceholder: "your@email.com",
  },
  US: {
    telephonePlaceholder: "+1 (XXX) XXX-XXXX",
    communeLabel: "City / State",
    communePlaceholder: "Ex: New York NY, Los Angeles CA...",
    quartierLabel: "ZIP Code",
    quartierPlaceholder: "Ex: 10001, 90001...",
    adressePlaceholder: "Street number, avenue, apartment...",
    emailPlaceholder: "your@email.com",
  },
  CA: {
    telephonePlaceholder: "+1 (XXX) XXX-XXXX",
    communeLabel: "City / Province",
    communePlaceholder: "Ex: Toronto ON, Montreal QC...",
    quartierLabel: "Postal Code",
    quartierPlaceholder: "Ex: M5H 2N2, H3B 2Y5...",
    adressePlaceholder: "Street number, avenue, unit...",
    emailPlaceholder: "your@email.ca",
  },
  CN: {
    telephonePlaceholder: "+86 XXX XXXX XXXX",
    communeLabel: "城市 (Ville)",
    communePlaceholder: "Ex: Beijing, Shanghai, Guangzhou...",
    quartierLabel: "区 (District)",
    quartierPlaceholder: "Ex: Chaoyang, Pudong...",
    adressePlaceholder: "省市区街道门牌号 (adresse complète)...",
    emailPlaceholder: "your@email.com",
  },
  JP: {
    telephonePlaceholder: "+81 XX XXXX XXXX",
    communeLabel: "都市 (Ville)",
    communePlaceholder: "Ex: Tokyo, Osaka, Kyoto...",
    quartierLabel: "郵便番号 (Code postal)",
    quartierPlaceholder: "Ex: 100-0001, 530-0001...",
    adressePlaceholder: "都道府県市区町村番地 (adresse complète)...",
    emailPlaceholder: "your@email.com",
  },
  RW: {
    telephonePlaceholder: "+250 XXX XXX XXX",
    communeLabel: "Ville / District",
    communePlaceholder: "Ex: Kigali, Butare, Gisenyi...",
    quartierLabel: "Secteur",
    quartierPlaceholder: "Ex: Kicukiro, Nyarugenge...",
    adressePlaceholder: "Rue, bâtiment, point de repère...",
    emailPlaceholder: "your@email.com",
  },
};

const DEFAULT_FORM_DATA = {
  telephonePlaceholder: "+XXX XX XX XX XX",
  communeLabel: "Ville",
  communePlaceholder: "Votre ville...",
  quartierLabel: "Quartier / Code postal",
  quartierPlaceholder: "Votre quartier ou code postal...",
  adressePlaceholder: "Adresse complète de livraison...",
  emailPlaceholder: "votre@email.com",
};

const RELATIONS = [
  "Famille",
  "Ami(e)",
  "Collègue",
  "Conjoint(e)",
  "Enfant",
  "Parent",
  "Autre",
];

export default function OrderForm() {
  const navigate = useNavigate();
  const [forOther, setForOther] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isSurprise, setIsSurprise] = useState(false);

  const selectedCountryCode = sessionStorage.getItem("selectedCountry") || "CI";
  const country = SHIPPING_COUNTRIES.find((c) => c.code === selectedCountryCode);
  const formData = COUNTRY_FORM_DATA[selectedCountryCode] || DEFAULT_FORM_DATA;

  const [form, setForm] = useState({
    // Infos expéditeur
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    commune: "",
    quartier: "",
    adresse: "",
    date_livraison: "",
    heure_livraison: "",
    notes: "",
    // Infos destinataire
    dest_nom: "",
    dest_prenom: "",
    dest_telephone: "",
    dest_email: "",
    dest_relation: "",
    dest_commune: "",
    dest_quartier: "",
    dest_adresse: "",
    dest_date_livraison: "",
    dest_heure_livraison: "",
    dest_instructions: "",
    dest_message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) return;
    sessionStorage.setItem("orderForm", JSON.stringify({ ...form, forOther, isSurprise }));
    navigate("/order-confirmation");
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <button className="back-home-btn" onClick={() => navigate("/order-choice")}>
          ← Retour
        </button>
        <h1 className="order-title">📝 Informations de livraison</h1>
      </div>

      {country && (
        <div className="order-country-banner">
          <span className="order-country-flag">{country.flag}</span>
          <div>
            <strong>Livraison vers : {country.name}</strong>
            <span className="order-country-delay"> — {country.delay}</span>
          </div>
          <button className="order-country-change" onClick={() => navigate("/cart")}>
            Changer
          </button>
        </div>
      )}

      <form className="order-form" onSubmit={handleSubmit}>

        {/* ── EXPÉDITEUR ── */}
        <h3 className="order-section-title">👤 Vos informations</h3>

        <div className="order-grid">
          <div className="order-field">
            <label>Nom *</label>
            <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Votre nom" />
          </div>
          <div className="order-field">
            <label>Prénom *</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} required placeholder="Votre prénom" />
          </div>
          <div className="order-field">
            <label>Téléphone *</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} required placeholder={formData.telephonePlaceholder} />
          </div>
          <div className="order-field">
            <label>Email (facultatif)</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={formData.emailPlaceholder} />
          </div>
          <div className="order-field">
            <label>{formData.communeLabel} *</label>
            <input name="commune" value={form.commune} onChange={handleChange} required placeholder={formData.communePlaceholder} />
          </div>
          <div className="order-field">
            <label>{formData.quartierLabel} *</label>
            <input name="quartier" value={form.quartier} onChange={handleChange} required placeholder={formData.quartierPlaceholder} />
          </div>
        </div>

        <div className="order-field order-field-full">
          <label>Adresse / Lieu exact de livraison *</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} required placeholder={formData.adressePlaceholder} />
        </div>

        <div className="order-grid">
          <div className="order-field">
            <label>Date de livraison souhaitée</label>
            <input name="date_livraison" type="date" value={form.date_livraison} onChange={handleChange} />
          </div>
          <div className="order-field">
            <label>Heure souhaitée</label>
            <input name="heure_livraison" type="time" value={form.heure_livraison} onChange={handleChange} />
          </div>
        </div>

        <div className="order-field order-field-full">
          <label>Informations complémentaires</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Instructions particulières, point de repère supplémentaire..." />
        </div>

        {/* ── DESTINATAIRE ── */}
        <h3 className="order-section-title">📬 Destinataire</h3>

        <div className="order-radio-group">
          <label className={`order-radio-btn ${!forOther ? "selected" : ""}`}>
            <input type="radio" name="dest" checked={!forOther} onChange={() => setForOther(false)} />
            👤 Pour moi-même
          </label>
          <label className={`order-radio-btn ${forOther ? "selected" : ""}`}>
            <input type="radio" name="dest" checked={forOther} onChange={() => setForOther(true)} />
            👥 Pour une autre personne
          </label>
        </div>

        {forOther && (
          <div className="order-dest-fields">

            {/* ── IDENTITÉ DESTINATAIRE ── */}
            <p className="dest-section-label">🪪 Identité du destinataire</p>
            <div className="order-grid">
              <div className="order-field">
                <label>Nom *</label>
                <input name="dest_nom" value={form.dest_nom} onChange={handleChange} required placeholder="Nom du destinataire" />
              </div>
              <div className="order-field">
                <label>Prénom *</label>
                <input name="dest_prenom" value={form.dest_prenom} onChange={handleChange} required placeholder="Prénom du destinataire" />
              </div>
              <div className="order-field">
                <label>Téléphone *</label>
                <input name="dest_telephone" value={form.dest_telephone} onChange={handleChange} required placeholder={formData.telephonePlaceholder} />
              </div>
              <div className="order-field">
                <label>Email (facultatif)</label>
                <input name="dest_email" type="email" value={form.dest_email} onChange={handleChange} placeholder={formData.emailPlaceholder} />
              </div>
              <div className="order-field">
                <label>Relation avec le destinataire</label>
                <select name="dest_relation" value={form.dest_relation} onChange={handleChange} className="order-select">
                  <option value="">Choisir une relation...</option>
                  {RELATIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── ADRESSE DESTINATAIRE ── */}
            <p className="dest-section-label">📍 Adresse de livraison du destinataire</p>
            <div className="order-grid">
              <div className="order-field">
                <label>{formData.communeLabel} *</label>
                <input name="dest_commune" value={form.dest_commune} onChange={handleChange} required placeholder={formData.communePlaceholder} />
              </div>
              <div className="order-field">
                <label>{formData.quartierLabel} *</label>
                <input name="dest_quartier" value={form.dest_quartier} onChange={handleChange} required placeholder={formData.quartierPlaceholder} />
              </div>
            </div>

            <div className="order-field order-field-full">
              <label>Adresse exacte *</label>
              <input name="dest_adresse" value={form.dest_adresse} onChange={handleChange} required placeholder={formData.adressePlaceholder} />
            </div>

            {/* ── DATE & HEURE DESTINATAIRE ── */}
            <p className="dest-section-label">📅 Date & heure de livraison pour le destinataire</p>
            <div className="order-grid">
              <div className="order-field">
                <label>Date souhaitée</label>
                <input name="dest_date_livraison" type="date" value={form.dest_date_livraison} onChange={handleChange} />
              </div>
              <div className="order-field">
                <label>Heure souhaitée</label>
                <input name="dest_heure_livraison" type="time" value={form.dest_heure_livraison} onChange={handleChange} />
              </div>
            </div>

            {/* ── SURPRISE ── */}
            <p className="dest-section-label">🎁 Type de livraison</p>
            <div className="surprise-toggle">
              <label className={`surprise-btn ${!isSurprise ? "selected" : ""}`}>
                <input type="radio" checked={!isSurprise} onChange={() => setIsSurprise(false)} />
                😊 Le destinataire est au courant
              </label>
              <label className={`surprise-btn ${isSurprise ? "selected" : ""}`}>
                <input type="radio" checked={isSurprise} onChange={() => setIsSurprise(true)} />
                🎁 C'est une surprise !
              </label>
            </div>

            {isSurprise && (
              <div className="surprise-notice">
                🤫 Nous veillerons à ne pas révéler le contenu du colis au destinataire lors de la livraison.
              </div>
            )}

            {/* ── INSTRUCTIONS & MESSAGE ── */}
            <p className="dest-section-label">💬 Message & instructions</p>
            <div className="order-field order-field-full">
              <label>Instructions particulières pour la livraison</label>
              <textarea
                name="dest_instructions"
                value={form.dest_instructions}
                onChange={handleChange}
                rows={2}
                placeholder="Point de repère, disponibilités, instructions spéciales pour le livreur..."
              />
            </div>

            <div className="order-field order-field-full">
              <label>Message à joindre au colis (facultatif)</label>
              <textarea
                name="dest_message"
                value={form.dest_message}
                onChange={handleChange}
                rows={3}
                placeholder="Ex: Joyeux anniversaire ! Avec tout mon amour... (Ce message sera imprimé et glissé dans le colis)"
              />
            </div>

          </div>
        )}

        {/* ── CONDITIONS ── */}
        <div className="order-conditions">
          <label className={`order-checkbox ${accepted ? "checked" : ""}`}>
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>
              J'accepte les{" "}
              <button type="button" className="conditions-link" onClick={() => navigate("/shipping")}>
                conditions de livraison
              </button>{" "}
              de Carmi Fashion.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className={`order-submit-btn ${accepted ? "" : "disabled"}`}
          disabled={!accepted}
        >
          Continuer vers la confirmation →
        </button>

      </form>
    </div>
  );
}