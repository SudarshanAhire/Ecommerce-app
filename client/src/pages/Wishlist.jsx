import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success("Moved to cart");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Your Wishlist</h1>
        {wishlistItems.length > 0 && (
          <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
          </span>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-16 text-center dark:border-slate-700">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
            <HiOutlineHeart className="h-12 w-12" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">Your wishlist is empty</h2>
          <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">Save items you love to your wishlist and move them to your cart when you&apos;re ready to buy.</p>
          <Link to="/" className="mt-8 rounded-full bg-slate-900 px-8 py-3.5 font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-slate-900">
            Start Shopping
          </Link>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {wishlistItems.map((item) => (
            <motion.div 
              key={item._id} 
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50"
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <button 
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:text-rose-400"
                  aria-label="Remove from wishlist"
                >
                  <HiOutlineHeart className="h-5 w-5 fill-rose-500 stroke-rose-500" />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="line-clamp-1 font-semibold text-slate-900 dark:text-slate-100">{item.name}</h2>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">₹{item.price?.toLocaleString()}</p>
                
                <div className="mt-auto pt-5">
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  >
                    <HiOutlineShoppingCart className="h-5 w-5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Wishlist;
