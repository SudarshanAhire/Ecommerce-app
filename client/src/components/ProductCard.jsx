import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingCart } from 'react-icons/hi2';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlistItems?.some((item) => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product);
      toast.success('Added to cart');
    }
  };

  const renderStars = (rating) => {
    const num = Math.round(rating || 0);
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < num ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>
        {i < num ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md overflow-hidden relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <Link to="/shop">
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.discount}% OFF
          </div>
        )}
        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          {isWishlisted ? (
            <HiHeart className="w-5 h-5 text-rose-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">
          {product.category || 'Category'}
        </span>
        
        <Link to="/shop">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm mb-2">
          <div className="flex mr-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            ({product.rating || 0})
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            ₹{(product.price || 0).toLocaleString()}
          </span>
          {(product.originalPrice || product.discount) && (
            <span className="text-sm text-gray-400 line-through">
              ₹{(product.originalPrice || Math.round((product.price || 0) / (1 - product.discount/100))).toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              product.stock > 0 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <HiOutlineShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}