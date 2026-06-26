import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import { SHIPPING_COUNTRIES } from "../data/shipping";
import "../App.css";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [forOther, setForOther] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [selectedCountry] = useState(
    sessionStorage.getItem("selectedCountry") || "CI"
  );

  const country = SHIPPING_COUNTRIES.find((c) => c.code === selectedCountry);
  const shippingCost = country ? country.price : 0;
  const sousTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity), 0
  );
  const grandTotal = sousTotal + shippingCost;

  const [form, setForm] = useState({
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
    dest_nom: "",
    dest_prenom: "",
    dest_telephone: "",
    dest_adresse: "",
  });

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Pré-remplir avec les infos du compte
        setForm((prev) => ({
          ...prev,
          email: user.email || "",
          nom: user.user_metadata?.nom || "",
          prenom: user.user_metadata?.prenom || "",
          telephone: user.user_metadata?.telephone || "",
        }));
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted) return;
    setSubmitting(true);

    const orderData = {
      // Infos client
      nom: form.nom,
      prenom: form.prenom,
      telephone: form.telephone,
      email: form.email,
      commune: form.commune,
      quartier: form.quartier,
      adresse: form.adresse,
      date_livraison: form.date_livraison || null,
      heure_livraison: form.heure_livraison || null,
      notes: form.notes,
      // Destinataire
      pour_autre: forOther,
      dest_nom: forOther ? form.dest_nom : null,
      dest_prenom: forOther ? form.dest_prenom : null,
      dest_telephone: forOther ? form.dest_telephone : null,
      dest_adresse: forOther ? form.dest_adresse : null,
      // Commande
      articles: JSON.stringify(cart),
      sous_total: sousTotal,
      frais_livraison: shippingCost,
      total: grandTotal,
      pays_livraison: country?.name,
      user_id: user?.id || null,
      statut: "en attente",
    };

    const { error } = await supabase.from("orders").insert([orderData]);

    setSubmitting(false);

    if (error) {
      console.error("Erreur commande :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    clearCart();
    navigate("/order-success");
  };

  if (loading) return <div className="order-loading">Chargement...</div>;

  return (
    <div className="order-page">
      <div className="order-header">
        <button className="back-home-btn" onClick={() => navigate("/cart")}>
          ← Retour au panier
        </button>
        <h1 className="order-title">📦 Confirmation de commande</h1>
      </div>

      {/* ── RÉCAP COMMANDE ── */}
      <div className="order-recap-box">
        <h3>🛍️ Votre commande</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-recap-line">
            <span>{item.name} × {Number(item.quantity)}</span>
            <span>{(Number(item.price) * Number(item.quantity)).toLocaleString("fr-FR")} FCFA</span>
          </div>
        ))}
        <div className="order-recap-line order-recap-sub">
          <span>Sous-total</span>
          <span>{sousTotal.toLocaleString("fr-FR")} FCFA</span>
        </div>
        <div className="order-recap-line order-recap-sub">
          <span>Livraison ({country?.name})</span>
          <span>{shippingCost.toLocaleString("fr-FR")} FCFA</span>
        </div>
        <div className="order-recap-line order-recap-total">
          <span>Total</span>
          <span>{grandTotal.toLocaleString("fr-FR")} FCFA</span>
        </div>
      </div>

      {/* ── FORMULAIRE ── */}
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
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              J'accepte les <button type="button" className="conditions-link" onClick={() => navigate("/shipping")}> conditions de livraison </button>  de Carmi Fashion.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className={`order-submit-btn ${accepted ? "" : "disabled"}`}
          disabled={!accepted || submitting}
        >
          {submitting ? "Enregistrement..." : "✅ Valider ma commande"}
        </button>

      </form>
    </div>
  );
}