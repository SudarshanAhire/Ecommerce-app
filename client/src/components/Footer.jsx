import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiCreditCard } from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-heading font-bold text-xl transition-transform group-hover:scale-105">
                S
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                ShopHub
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for premium products. We offer the best quality items with fast shipping and exceptional customer service.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-400 transition-colors" aria-label="GitHub">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-sm hover:text-blue-400 transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="text-sm hover:text-blue-400 transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="text-sm hover:text-blue-400 transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-blue-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-blue-400 transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Stay in the Loop</h3>
            <p className="text-sm mb-4 text-slate-400">Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-lg px-4 py-3 text-sm hover:from-blue-500 hover:to-blue-300 transition-all shadow-lg shadow-blue-500/20"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} ShopHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <FiCreditCard className="w-6 h-6 text-slate-600 hover:text-slate-400 transition-colors" />
            <span className="text-sm text-slate-600">Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;