import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderForm() {
  const navigate = useNavigate();
  const [forOther, setForOther] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    nom: "", prenom: "", telephone: "", email: "",
    commune: "", quartier: "", adresse: "",
    date_livraison: "", heure_livraison: "", notes: "",
    dest_nom: "", dest_prenom: "", dest_telephone: "", dest_adresse: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) return;

    // Sauvegarde les infos pour la page de confirmation
    sessionStorage.setItem("orderForm", JSON.stringify({ ...form, forOther }));
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

      <form className="order-form" onSubmit={handleSubmit}>

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
            <input name="telephone" value={form.telephone} onChange={handleChange} required placeholder="+225 XX XX XX XX XX" />
          </div>
          <div className="order-field">
            <label>Email (facultatif)</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" />
          </div>
          <div className="order-field">
            <label>Commune *</label>
            <input name="commune" value={form.commune} onChange={handleChange} required placeholder="Ex: Yopougon" />
          </div>
          <div className="order-field">
            <label>Quartier *</label>
            <input name="quartier" value={form.quartier} onChange={handleChange} required placeholder="Ex: Selmer" />
          </div>
        </div>

        <div className="order-field order-field-full">
          <label>Adresse / Lieu exact de livraison *</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} required placeholder="Rue, bâtiment, point de repère..." />
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
            <div className="order-grid">
              <div className="order-field">
                <label>Nom du destinataire *</label>
                <input name="dest_nom" value={form.dest_nom} onChange={handleChange} required={forOther} placeholder="Nom" />
              </div>
              <div className="order-field">
                <label>Prénom du destinataire *</label>
                <input name="dest_prenom" value={form.dest_prenom} onChange={handleChange} required={forOther} placeholder="Prénom" />
              </div>
              <div className="order-field">
                <label>Téléphone du destinataire *</label>
                <input name="dest_telephone" value={form.dest_telephone} onChange={handleChange} required={forOther} placeholder="+225 XX XX XX XX XX" />
              </div>
            </div>
            <div className="order-field order-field-full">
              <label>Adresse de livraison du destinataire *</label>
              <input name="dest_adresse" value={form.dest_adresse} onChange={handleChange} required={forOther} placeholder="Adresse complète du destinataire" />
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