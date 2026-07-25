import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiArrowRight } from 'react-icons/hi2';

export default function Hero() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 min-h-[500px] rounded-3xl overflow-hidden flex items-center mb-12 shadow-xl">
      {/* Decorative floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center z-10">
        
        {/* Left Content */}
        <motion.div 
          className="w-full md:w-1/2 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-blue-200 text-sm md:text-base font-bold tracking-widest uppercase mb-4">
            New Season Essentials
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Discover Premium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Products Curated
            </span> <br />
            for You
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-indigo-100 text-lg mb-8 max-w-xl leading-relaxed">
            Elevate your lifestyle with our exclusive collection. Uncompromising quality meets modern design in every piece we offer.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Link to="/shop" className="group flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Shop Now
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {!user && (
              <Link to="/register" className="flex items-center justify-center border-2 border-white/80 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Create Account
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Right Side Decoration/Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end hidden md:flex"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
             <div className="w-16 h-16 bg-white/20 rounded-full blur-xl absolute top-4 left-4" />
             <div className="w-32 h-32 bg-purple-400/20 rounded-full blur-2xl absolute bottom-10 right-10" />
             
             <div className="relative z-10 w-full h-1/2 bg-white/10 rounded-xl mb-4 border border-white/10" />
             <div className="relative z-10 flex gap-4 w-full h-1/3">
               <div className="w-1/2 h-full bg-white/10 rounded-xl border border-white/10" />
               <div className="w-1/2 h-full bg-white/10 rounded-xl border border-white/10" />
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}