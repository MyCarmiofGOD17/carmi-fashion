import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../App.css";
import "./ProductPage.css";

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const BABY_SHOE_SIZES = ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
const BAG_SIZES = ["Petit", "Moyen", "Grand"];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);
  const [mode, setMode] = useState("self");

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [sizeQuantities, setSizeQuantities] = useState({});

  const [activeImage, setActiveImage] = useState(0);
  const [toast, setToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Erreur produit :", error);
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(data);

      const sizes =
        data.size_type === "chaussure" ? SHOE_SIZES :
        data.size_type === "chaussure_bebe" ? BABY_SHOE_SIZES :
        data.size_type === "sac" ? BAG_SIZES :
        CLOTHING_SIZES;

      setSizeQuantities(sizes.reduce((acc, s) => ({ ...acc, [s]: 0 }), {}));

      const { data: colorData, error: colorError } = await supabase
        .from("product_colors")
        .select("*")
        .eq("product_id", id);

      if (colorError) {
        console.log("Erreur couleurs :", colorError);
        setColors([]);
      } else {
        setColors(colorData || []);
        if (colorData && colorData.length === 1) {
          setSelectedColor(colorData[0]);
        }
      }

      const { data: simData } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(4);

      setSimilar(simData || []);
      setLoading(false);
      window.scrollTo({ top: 0 });
    }

    fetchProduct();
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
    setMode("self");
    setActiveImage(0);
    setErrorMsg("");
  }, [id]);

  if (loading) {
    return <div className="product-loading">Chargement du produit...</div>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Produit introuvable.</p>
        <button className="auth-btn" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const isShoe = product.size_type === "chaussure";
  const isBabyShoe = product.size_type === "chaussure_bebe";
  const isBag = product.size_type === "sac";

  const SIZES = isBabyShoe ? BABY_SHOE_SIZES
    : isShoe ? SHOE_SIZES
    : isBag ? BAG_SIZES
    : CLOTHING_SIZES;

  const sizeLabel = (isShoe || isBabyShoe) ? "Pointure" : "Taille";

  const inStock = product.in_stock === undefined ? true : product.in_stock;
  const gallery = product.gallery_urls?.length
    ? product.gallery_urls
    : [product.image_url];

  const totalOtherQty = Object.values(sizeQuantities).reduce((a, b) => a + Number(b || 0), 0);

  const handleSizeQtyChange = (size, value) => {
    const v = Math.max(0, Number(value) || 0);
    setSizeQuantities((prev) => ({ ...prev, [size]: v }));
  };

  const handleAddToCart = () => {
    setErrorMsg("");

    if (colors.length > 0 && !selectedColor) {
      setErrorMsg("Merci de choisir une couleur.");
      return;
    }

    if (mode === "self") {
      if (!selectedSize) {
        setErrorMsg(`Merci de choisir une ${sizeLabel.toLowerCase()}.`);
        return;
      }
      if (quantity <= 0) {
        setErrorMsg("La quantité doit être supérieure à 0.");
        return;
      }

      addToCart(product, {
        size: selectedSize,
        color: selectedColor?.color_name || null,
        quantity: Number(quantity),
      });

      setToast(true);
      setTimeout(() => setToast(false), 2500);

    } else {
      if (totalOtherQty <= 0) {
        setErrorMsg(`Merci de renseigner au moins une quantité par ${sizeLabel.toLowerCase()}.`);
        return;
      }
      if (totalOtherQty !== Number(quantity)) {
        setErrorMsg(
          `La somme des quantités par ${sizeLabel.toLowerCase()} (${totalOtherQty}) doit être égale à la quantité totale (${quantity}).`
        );
        return;
      }

      Object.entries(sizeQuantities).forEach(([size, qty]) => {
        if (Number(qty) > 0) {
          addToCart(product, {
            size,
            color: selectedColor?.color_name || null,
            quantity: Number(qty),
          });
        }
      });

      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  const description =
    product.description ||
    `${product.name} est une pièce élégante signée Carmi Fashion, pensée pour sublimer votre style au quotidien comme lors d'occasions spéciales. Sa coupe soignée et ses finitions de qualité en font un indispensable de votre garde-robe.\n\nIdéal pour les sorties, les événements ou un usage quotidien, ce vêtement s'associe facilement avec d'autres pièces de votre dressing pour créer des looks variés.\n\nConseil d'entretien : lavage délicat recommandé pour préserver la qualité du tissu et la couleur dans le temps.`;

  return (
    <div className="product-page">

      {toast && (
        <div className="toast-notification">
          ✅ Produit ajouté au panier !
        </div>
      )}

      <button className="back-home-btn product-back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="product-detail-grid">

        <div className="product-gallery">
          <div className="product-main-image">
            <img src={gallery[activeImage]} alt={product.name} />
          </div>

          {gallery.length > 1 && (
            <div className="product-thumbnails">
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className={`product-thumb ${index === activeImage ? "thumb-active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">

          {product.category_label && (
            <p className="product-detail-category">{product.category_label}</p>
          )}

          <h1 className="product-detail-name">{product.name}</h1>

          <p className="product-detail-price">
            {Number(product.price).toLocaleString("fr-FR")} FCFA
          </p>

          <p className={`stock-status ${inStock ? "in-stock" : "out-stock"}`}>
            {inStock ? "✓ En stock" : "✕ Rupture de stock"}
          </p>

          {colors.length > 0 && (
            <div className="product-option-group">
              <h4>
                Couleur
                {selectedColor && (
                  <span className="selected-color-name"> — {selectedColor.color_name}</span>
                )}
              </h4>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-swatch ${selectedColor?.id === color.id ? "color-selected" : ""}`}
                    style={{ background: color.color_hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.color_name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="product-option-group">
            <h4>Cette commande est :</h4>
            <div className="order-radio-group">
              <label className={`order-radio-btn ${mode === "self" ? "selected" : ""}`}>
                <input
                  type="radio"
                  checked={mode === "self"}
                  onChange={() => { setMode("self"); setErrorMsg(""); }}
                />
                👤 C'est pour moi
              </label>
              <label className={`order-radio-btn ${mode === "other" ? "selected" : ""}`}>
                <input
                  type="radio"
                  checked={mode === "other"}
                  onChange={() => { setMode("other"); setErrorMsg(""); }}
                />
                👥 C'est pour une autre personne
              </label>
            </div>
          </div>

          {mode === "self" && (
            <div className="product-option-group">
              <h4>{sizeLabel}</h4>
              <div className="size-options">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "size-selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "other" && (
            <div className="product-option-group">
              <h4>Répartition par {sizeLabel.toLowerCase()}</h4>
              <div className="size-breakdown">
                {SIZES.map((size) => (
                  <div key={size} className="size-breakdown-row">
                    <span className="size-breakdown-label">{size}</span>
                    <input
                      type="number"
                      min="0"
                      value={sizeQuantities[size] || 0}
                      onChange={(e) => handleSizeQtyChange(size, e.target.value)}
                      className="size-breakdown-input"
                    />
                  </div>
                ))}
              </div>
              <p className="size-breakdown-total">
                Total réparti : <strong>{totalOtherQty}</strong> / Quantité totale : <strong>{quantity}</strong>
              </p>
            </div>
          )}

          <div className="product-option-group">
            <h4>Quantité totale</h4>
            <div className="product-qty-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {errorMsg && <p className="product-error-msg">⚠️ {errorMsg}</p>}

          <button
            className="product-add-btn"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            🛍️ Ajouter au panier
          </button>

          <div className="product-description">
            <h3>Description</h3>
            {description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

        </div>
      </div>

      {similar.length > 0 && (
        <div className="similar-products">
          <h2 className="similar-title">Vous pourriez aussi aimer</h2>
          <div className="products-row">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}