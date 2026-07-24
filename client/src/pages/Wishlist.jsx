import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="mt-4 text-slate-600 dark:text-slate-300">No items saved yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {wishlistItems.map((item) => (
            <div key={item._id} className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <img src={item.image} alt={item.name} className="h-40 w-full rounded-2xl object-cover" />
              <h2 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{item.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">₹{item.price?.toLocaleString()}</p>
              <button className="mt-4 text-sm font-semibold text-red-600 dark:text-rose-300" onClick={() => removeFromWishlist(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
