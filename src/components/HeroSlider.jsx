import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./HeroSlider.css";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      const { data, error } = await supabase
        .from("slider_images")
        .select("*");

      if (error) {
        console.log("Slider error:", error);
        return;
      }

      setSlides(data || []);
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  const prev = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const next = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  if (!slides.length) {
    return <div className="slider-placeholder" />;
  }

  return (
    <div className="hero-slider">

      <div
        className="slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slide-item">
            <img src={slide.image_url} alt="slide" />
          </div>
        ))}
      </div>

      <button className="slider-arrow slider-arrow-left" onClick={prev}>‹</button>
      <button className="slider-arrow slider-arrow-right" onClick={next}>›</button>

      <div className="slide-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "dot-active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    </div>
  );
}