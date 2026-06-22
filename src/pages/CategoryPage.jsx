import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import "../App.css";

const CATEGORY_MAP = {
  hommes: "c633cc4b-ca68-4c54-8133-fafd5b4ae5c0",
  femmes: "85e009ec-49d0-482f-80b8-49a4cb37635d",
  enfants: "cfc5751c-246a-4480-993f-ab8f89e8c66c",
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const categoryUUID = CATEGORY_MAP[categoryId?.toLowerCase()];

  useEffect(() => {
    async function fetchProducts() {
      if (!categoryUUID) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryUUID);

      if (error) {
        console.log("Erreur :", error);
      } else {
        setProducts(data || []);
      }
    }
    fetchProducts();
  }, [categoryUUID]);

  return (
    <div className="container">
      <div className="category-page-header">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </button>

        <h2 className="category-title" style={{ textTransform: "uppercase" }}>
          {categoryId}
        </h2>

        <div className="other-categories">
          {Object.keys(CATEGORY_MAP)
            .filter((key) => key !== categoryId?.toLowerCase())
            .map((key) => (
              <button
                key={key}
                className="other-cat-btn"
                onClick={() => navigate(`/category/${key}`)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
        </div>
      </div>

      <div className="products-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}