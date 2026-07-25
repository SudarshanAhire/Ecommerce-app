import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-16 relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create account</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Join ShopHub and start shopping</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white/50 p-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-blue-400 transition-all" 
              type="text" 
              placeholder="Full Name" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
            />
          </div>
          <div>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white/50 p-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-blue-400 transition-all" 
              type="email" 
              placeholder="Email address" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>
          <div>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white/50 p-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-blue-400 transition-all" 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
            />
          </div>
          <button 
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-70" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account? <Link className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400" to="/login">Sign in</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
