import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">

      {/* ── HAUT DU FOOTER ── */}
      <div className="footer-top">

        {/* Colonne 1 — Logo + description */}
        <div className="footer-col footer-brand">
          <img
            src="https://fqyfphnebclfswfrhhzv.supabase.co/storage/v1/object/public/assets/logo.png"
            alt="Carmi Fashion"
            className="footer-logo"
          />
          <p className="footer-desc">
            Votre boutique de mode en ligne. Des vêtements tendance pour hommes,
            femmes et enfants, livrés partout en Afrique et dans le monde.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L.057 23.428a.5.5 0 00.609.61l5.706-1.497A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 01-5.073-1.384l-.361-.214-3.762.988.988-3.678-.235-.374A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
            </a>
          </div>
        </div>

        {/* Colonne 2 — Liens rapides */}
        <div className="footer-col">
          <h4 className="footer-heading">Liens rapides</h4>
          <ul className="footer-links">
            <li><button className="footer-link-btn" onClick={() => goTo("/")}>Accueil</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/category/hommes")}>Hommes</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/category/femmes")}>Femmes</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/category/enfants")}>Enfants</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/cart")}>Mon Panier</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/login")}>Se connecter</button></li>
            <li><button className="footer-link-btn" onClick={() => goTo("/register")}>S'inscrire</button></li>
          </ul>
        </div>

        {/* Colonne 3 — Nos boutiques */}
        <div className="footer-col">
          <h4 className="footer-heading">Nos boutiques en CI</h4>
          <ul className="footer-links">
            {[
              "Yopougon — Siège principal",
              "Adjamé — Marché d'Adjamé",
              "Plateau — Centre commercial Cap Sud",
              "Cocody — Carrefour Riviera",
              "Marcory — Zone 4",
              "Bouaké — Marché central",
              "San Pedro — Centre ville",
            ].map((boutique) => (
              <li key={boutique} className="boutique-item">
                <img
                  src="https://fqyfphnebclfswfrhhzv.supabase.co/storage/v1/object/public/assets/logo.png"
                  alt="Carmi Fashion"
                  className="boutique-logo"
                />
                <span>{boutique}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Livraison + Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Livraison internationale</h4>
          <div className="footer-countries">
            {[
              { flag: "🇲🇦", name: "Maroc" },
              { flag: "🇬🇦", name: "Gabon" },
              { flag: "🇳🇬", name: "Nigéria" },
              { flag: "🇧🇯", name: "Bénin" },
              { flag: "🇹🇬", name: "Togo" },
              { flag: "🇬🇭", name: "Ghana" },
              { flag: "🇫🇷", name: "France" },
              { flag: "🇹🇷", name: "Turquie" },
              { flag: "🇺🇸", name: "États-Unis" },
              { flag: "🇨🇦", name: "Canada" },
              { flag: "🇨🇳", name: "Chine" },
              { flag: "🇯🇵", name: "Japon" },
              { flag: "🇷🇼", name: "Rwanda" },
            ].map((c) => (
              <span key={c.name} className="country-tag">
                {c.flag} {c.name}
              </span>
            ))}
          </div>

          <h4 className="footer-heading" style={{ marginTop: "24px" }}>Contact</h4>
          <ul className="footer-links">
            <li>📞 <a href="tel:+2250574326131">+225 05 74 32 61 31</a></li>
            <li>📍 Abidjan, Yopougon — Côte d'Ivoire</li>
            <li>📧 <a href="mailto:contact@carmifashion.ci">contact@carmifashion.ci</a></li>
          </ul>
        </div>

      </div>

      {/* ── BAS DU FOOTER ── */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Carmi Fashion. Tous droits réservés.</p>
        <div className="footer-legal">
          <a href="#">Politique de confidentialité</a>
          <a href="#">Conditions générales</a>
          <a href="#">Politique de livraison</a>
          <a href="#">Retours & Remboursements</a>
        </div>
      </div>

    </footer>
  );
}