import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <Home />
              </>
            }
          />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}