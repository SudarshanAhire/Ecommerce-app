import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import api from "../services/api";

const HOME_PRODUCTS_KEY = "shophub-home-products";
const HOME_CATEGORIES_KEY = "shophub-home-categories";

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (value && typeof value === "object") {
    if (Array.isArray(value.categories)) return value.categories;
    if (Array.isArray(value.data)) return value.data;
    if (Array.isArray(value.items)) return value.items;
  }

  if (typeof value === "string") {
    try {
      return normalizeArray(JSON.parse(value));
    } catch {
      return [];
    }
  }

  return [];
};

const getStoredCatalog = (key) => {
  if (typeof window === "undefined") return [];

  try {
    const value = localStorage.getItem(key);
    return normalizeArray(value ? JSON.parse(value) : []);
  } catch {
    return [];
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const [products, setProducts] = useState(() => getStoredCatalog(HOME_PRODUCTS_KEY));
  const [categories, setCategories] = useState(() => getStoredCatalog(HOME_CATEGORIES_KEY));

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([api.get("/products"), api.get("/categories")]);
        const nextProducts = normalizeArray(productsRes?.data?.products ?? productsRes?.data?.data ?? productsRes?.data).slice(0, 12);
        const nextCategories = normalizeArray(categoriesRes?.data?.categories ?? categoriesRes?.data?.data ?? categoriesRes?.data);

        setProducts(nextProducts);
        setCategories(nextCategories);
        localStorage.setItem(HOME_PRODUCTS_KEY, JSON.stringify(nextProducts));
        localStorage.setItem(HOME_CATEGORIES_KEY, JSON.stringify(nextCategories));
      } catch (error) {
        console.error(error);
        setProducts([]);
        setCategories([]);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Hero />

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">Shop by Category</h2>
          <Link to="/shop" className="text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline">View all</Link>
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 h-40"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {Array.isArray(categories) && categories.map((category) => (
              <motion.div key={category._id} variants={itemVariants}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">Featured Products</h2>
          <Link to="/shop" className="text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline">Explore more</Link>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 h-80"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {Array.isArray(products) && products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">Why Choose Us</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We provide the best shopping experience for our customers with premium features and top-notch support.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">On all orders over $50</p>
          </div>
          
          <div className="rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">100% secure payment methods</p>
          </div>
          
          <div className="rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">We're here to help anytime</p>
          </div>
          
          <div className="rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">↩️</div>
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;