import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const SHOP_PRODUCTS_KEY = "shophub-shop-products";

const getStoredShopProducts = () => {
  if (typeof window === "undefined") return [];

  try {
    const value = localStorage.getItem(SHOP_PRODUCTS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

function Shop() {
  const [products, setProducts] = useState(() => getStoredShopProducts());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        const nextProducts = data.products || [];
        setProducts(nextProducts);
        localStorage.setItem(SHOP_PRODUCTS_KEY, JSON.stringify(nextProducts));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Discover</p>
          <h1 className="text-3xl font-bold">Popular products</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
