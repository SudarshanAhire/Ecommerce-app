import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_20%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-20 md:flex-row md:py-24">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">New season essentials</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            Shop smarter with premium deals delivered fast.
          </h1>
          <p className="mt-6 text-lg text-blue-50">
            Discover fashion, tech, accessories, and everyday favorites curated for modern living.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition hover:scale-[1.02] hover:bg-slate-100">Shop Now</Link>
            {!user && (
              <Link to="/register" className="rounded-xl border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">Create Account</Link>
            )}
          </div>
        </div>

        <img src="https://picsum.photos/500/400" alt="Hero" className="mt-10 h-72 w-full max-w-md rounded-4xl object-cover shadow-2xl md:mt-0" />
      </div>
    </section>
  );
}

export default Hero;