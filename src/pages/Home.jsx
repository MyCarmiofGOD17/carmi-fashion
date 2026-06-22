import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import "../App.css";

function CategorySection({ title, products, slug }) {
  const navigate = useNavigate();

  return (
    <div className="category-row">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <div className="category-divider"></div>

        <button
          className="see-more-btn"
          onClick={() => navigate(`/category/${slug}`)}
        >
          Plus de produits
          <span className="arrow">›</span>
        </button>
      </div>

      <div className="products-row">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.log("Erreur :", error);
      } else {
        setProducts(data || []);
      }
    }
    fetchProducts();
  }, []);

  const hommes = products.filter(
    (p) => p.category_id === "c633cc4b-ca68-4c54-8133-fafd5b4ae5c0"
  );
  const femmes = products.filter(
    (p) => p.category_id === "85e009ec-49d0-482f-80b8-49a4cb37635d"
  );
  const enfants = products.filter(
    (p) => p.category_id === "cfc5751c-246a-4480-993f-ab8f89e8c66c"
  );

  return (
    <div className="container">
      <CategorySection title="HOMMES" products={hommes} slug="hommes" />
      <CategorySection title="FEMMES" products={femmes} slug="femmes" />
      <CategorySection title="ENFANTS" products={enfants} slug="enfants" />
    </div>
  );
}