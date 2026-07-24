import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import api from "../services/api";

const HOME_PRODUCTS_KEY = "shophub-home-products";
const HOME_CATEGORIES_KEY = "shophub-home-categories";

const getStoredCatalog = (key) => {
  if (typeof window === "undefined") return [];

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

function Home() {
  const [products, setProducts] = useState(() => getStoredCatalog(HOME_PRODUCTS_KEY));
  const [categories, setCategories] = useState(() => getStoredCatalog(HOME_CATEGORIES_KEY));

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([api.get("/products"), api.get("/categories")]);
        const nextProducts = (productsRes.data.products || []).slice(0, 12);
        const nextCategories = categoriesRes.data || [];

        setProducts(nextProducts);
        setCategories(nextCategories);
        localStorage.setItem(HOME_PRODUCTS_KEY, JSON.stringify(nextProducts));
        localStorage.setItem(HOME_CATEGORIES_KEY, JSON.stringify(nextCategories));
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Shop by Category</h2>
          <a href="/shop" className="text-sm font-semibold text-blue-600 dark:text-sky-400">View all</a>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Featured Products</h2>
          <a href="/shop" className="text-sm font-semibold text-blue-600 dark:text-sky-400">Explore more</a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;