import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight text-blue-600 dark:text-sky-400">ShopHub</Link>
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 md:gap-6">
          <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/">Home</Link>
          <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/shop">Shop</Link>
          <Link className="relative transition hover:text-blue-600 dark:hover:text-sky-400" to="/cart">Cart {totalItems > 0 && <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">{totalItems}</span>}</Link>
          <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/wishlist">Wishlist</Link>
          <button onClick={toggleTheme} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400">{theme === "dark" ? "Light" : "Dark"}</button>
          {user ? (
            <>
              {user.role === "admin" && <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/admin">Admin</Link>}
              <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/orders">Orders</Link>
              <button onClick={logout} className="font-bold text-red-500 transition hover:text-red-600">Logout</button>
            </>
          ) : (
            <Link className="transition hover:text-blue-600 dark:hover:text-sky-400" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;