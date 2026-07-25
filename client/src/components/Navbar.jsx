import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineSun, 
  HiOutlineMoon, 
  HiOutlineMagnifyingGlass, 
  HiBars3, 
  HiXMark 
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/80 backdrop-blur-md shadow-sm shadow-border/50 border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-heading font-bold text-xl transition-transform group-hover:scale-105">
                S
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-text">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent relative ${
                    location.pathname === link.path ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <button className="text-text-secondary hover:text-accent transition-colors hidden sm:flex p-2 rounded-full hover:bg-muted items-center justify-center">
                <HiOutlineMagnifyingGlass className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleTheme}
                className="text-text-secondary hover:text-accent transition-colors p-2 rounded-full hover:bg-muted flex items-center justify-center"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
              </button>

              <Link to="/wishlist" className="text-text-secondary hover:text-accent transition-colors hidden sm:flex p-2 rounded-full hover:bg-muted items-center justify-center">
                <HiOutlineHeart className="w-5 h-5" />
              </Link>

              <Link to="/cart" className="relative text-text-secondary hover:text-accent transition-colors p-2 rounded-full hover:bg-muted flex items-center justify-center group">
                <HiOutlineShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-accent rounded-full border-2 border-bg group-hover:border-muted transition-colors"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-border">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-text">{user.name}</span>
                    <button onClick={logout} className="text-sm font-medium text-text-secondary hover:text-danger transition-colors">
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-medium text-text hover:text-accent transition-colors">
                      Log in
                    </Link>
                    <Link to="/register" className="text-sm font-medium bg-accent text-white px-4 py-2 rounded-full hover:bg-accent-hover transition-colors shadow-sm hover:shadow-md">
                      Sign up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-text p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                onClick={() => setMobileMenuOpen(true)}
              >
                <HiBars3 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-bg border-l border-border shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-heading font-bold text-xl text-text">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-text p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? "bg-accent/10 text-accent"
                          : "text-text-secondary hover:bg-muted hover:text-text"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/wishlist"
                    className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:bg-muted hover:text-text transition-colors flex items-center justify-between"
                  >
                    Wishlist
                    <HiOutlineHeart className="w-5 h-5" />
                  </Link>
                </nav>

                <div className="border-t border-border pt-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-text">{user.name}</div>
                          <div className="text-sm text-text-secondary">{user.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-danger hover:bg-danger/10 transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 px-2">
                      <Link
                        to="/login"
                        className="flex items-center justify-center py-2.5 px-4 rounded-full text-sm font-medium border border-border text-text hover:bg-muted transition-colors"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center py-2.5 px-4 rounded-full text-sm font-medium bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;