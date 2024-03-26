import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const result = await response.json();
    
      if (result && result.products && result.products.length > 0) {
        setProducts(result.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleScrollProgress() {
    const scrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrolled / totalHeight) * 100;
    setScrollProgress(progress);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollProgress);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <div className="title">
        <h1>Scroll Indicator</h1>
      </div>
      <div className="progress-container" style={{width:` ${scrollProgress}%`}}></div>

      <div className="products">
        {products && products.length > 0
          ? products.map((product) => <p key={product.id}>{product.title}</p>)
          : null}
      </div>
    </div>
  );
}
