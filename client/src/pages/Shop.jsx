import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMagnifyingGlass, HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const cats = res.data?.categories ?? res.data?.data ?? res.data;
        if (Array.isArray(cats)) {
          setCategories(cats);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (category) params.append("category", category);
        if (sort) params.append("sort", sort);
        params.append("page", page);
        
        const res = await api.get(`/products?${params.toString()}`);
        const data = res.data;
        
        setProducts(data?.products || data?.data || []);
        
        if (data?.pagination) {
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, category, sort, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleCategorySelect = (slug) => {
    setCategory(category === slug ? "" : slug);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setCategory("");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            Shop Everything
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Discover our latest collection of premium products designed just for you.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm text-slate-700 dark:text-slate-300 font-medium"
          >
            <HiAdjustmentsHorizontal className="w-5 h-5" />
            Filters
          </button>
          
          <select 
            value={sort} 
            onChange={handleSortChange}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm px-4 py-2 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Filter Bar */}
        <div className={`md:flex flex-col md:flex-row gap-6 mb-8 items-center justify-between ${showFilters ? 'block' : 'hidden md:flex'}`}>
          
          <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow"
            />
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button type="submit" className="hidden">Search</button>
          </form>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              // Ensure we use slug or string value for filtering
              const catValue = cat.slug || cat.name || cat;
              const catLabel = cat.name || cat;
              const isActive = category === catValue;
              
              return (
                <button
                  key={cat._id || catValue}
                  onClick={() => handleCategorySelect(catValue)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400"
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block">
            <select 
              value={sort} 
              onChange={handleSortChange}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm px-4 py-3 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(searchTerm || category || sort !== "newest") && (
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-sm text-slate-500 dark:text-slate-400">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-800 dark:text-slate-200">
                "{searchTerm}"
                <button onClick={() => { setSearchTerm(""); setSearchInput(""); }} className="hover:text-red-500"><HiXMark /></button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-800 dark:text-slate-200">
                {category}
                <button onClick={() => setCategory("")} className="hover:text-red-500"><HiXMark /></button>
              </span>
            )}
            <button onClick={clearFilters} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl h-80 border border-slate-100 dark:border-slate-700">
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-t-2xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">No products found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              We couldn't find any products matching your current filters. Try adjusting your search or category selection.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === i + 1 
                          ? "bg-blue-600 text-white" 
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;
