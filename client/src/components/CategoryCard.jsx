import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      <Link to="/shop" className="block w-full h-full">
        <div className="relative overflow-hidden h-48">
          <img
            src={category.image || 'https://via.placeholder.com/400x300'}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl tracking-wide">{category.name}</h3>
          </div>
        </div>
        {category.description && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
              {category.description}
            </p>
          </div>
        )}
      </Link>
    </motion.div>
  );
}