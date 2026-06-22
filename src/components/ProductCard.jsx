import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../App.css";

function StarRating({ rating = 4 }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const inStock = product.in_stock === undefined ? true : product.in_stock;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image_url} alt={product.name} />
      </div>

      <h3 className="product-name">{product.name}</h3>

      {product.category_label && (
        <p className="product-subtitle">{product.category_label}</p>
      )}

      <StarRating rating={product.rating} />

      <p className={`stock-status ${inStock ? "in-stock" : "out-stock"}`}>
        {inStock ? "✓ En stock" : "✕ Rupture de stock"}
      </p>

      <p className="product-price">
        {product.price.toLocaleString("fr-FR")} FCFA
      </p>

      <button
        className={`add-to-cart-btn ${added ? "added" : ""}`}
        onClick={handleAdd}
        disabled={!inStock}
      >
        {added ? "✓ Ajouté !" : "Ajouter au panier"}
      </button>

      <div className="product-store">
        <span className="store-icon">🏬</span>
        <span>Carmi Fashion</span>
      </div>
    </div>
  );
}