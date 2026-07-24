import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_12px_30px_rgba(2,6,23,0.45)]">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={product.image} alt={product.name} className="h-56 w-full rounded-2xl object-cover" />
      </div>
      <div className="mt-4 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-sky-400">{product.category}</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{product.name}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-bold text-blue-600 dark:text-sky-400">₹{product.price?.toLocaleString()}</p>
        <span className="text-sm text-slate-500 dark:text-slate-400">{product.stock} left</span>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-indigo-700" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button className={`rounded-xl border px-3 py-2 font-bold ${isWishlisted ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300" : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-200"}`} onClick={() => addToWishlist(product)}>
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;