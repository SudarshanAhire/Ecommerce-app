import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      toast.success(data.message || "Reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Forgot password</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Enter your email and we&apos;ll send a reset link.</p>
        
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white/50 p-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-blue-400 transition-all" 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button 
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-70" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
