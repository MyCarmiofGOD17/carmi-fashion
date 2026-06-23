import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../App.css";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;

      if (scrollingDown && window.scrollY > 80) {
        setHidden(true);
      } else if (!scrollingDown) {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>

      <div className="logo">
        <Link to="/">
          <img
            src="https://fqyfphnebclfswfrhhzv.supabase.co/storage/v1/object/public/assets/logo.png"
            alt="Carmi Fashion"
            className="navbar-logo"
          />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/category/hommes">Hommes</Link></li>
        <li><Link to="/category/femmes">Femmes</Link></li>
        <li><Link to="/category/enfants">Enfants</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/register" className="nav-btn">📝 S'inscrire</Link>
        <Link to="/login" className="nav-btn">🔑 Se connecter</Link>
        <Link to="/cart" className="nav-cart">
          🛒 Panier
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
      </div>

    </nav>
  );
}