import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiPlus, HiMinus, HiOutlineShoppingBag } from "react-icons/hi2";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors py-20 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <HiOutlineShoppingBag className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-700 mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Discover our latest products and find something you love.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Shopping Cart</h1>
          <p className="text-slate-600 dark:text-slate-400">You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => {
                // Handle different potential structures for product data
                const productId = item.product?._id || item._id;
                const name = item.product?.name || item.name || "Product";
                const price = item.product?.price || item.price || 0;
                const image = item.product?.images?.[0]?.url || item.image || item.product?.image || "https://via.placeholder.com/150";
                
                return (
                  <motion.div 
                    key={productId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                  >
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                      <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                      <div className="space-y-1">
                        <Link to={`/product/${productId}`} className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                          {name}
                        </Link>
                        <div className="text-lg font-bold text-blue-600 dark:text-sky-400">
                          ${price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <button 
                            onClick={() => handleQuantityChange(productId, item.quantity, -1)}
                            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-slate-900 dark:text-slate-100">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(productId, item.quantity, 1)}
                            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
                          >
                            <HiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(productId)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <HiOutlineTrash className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Order Summary</h2>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Total</span>
                  <span className="text-3xl font-bold text-blue-600 dark:text-sky-400">${totalPrice.toFixed(2)}</span>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full flex items-center justify-center py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-lg"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-4 text-center">
                  <Link to="/shop" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Cart;
