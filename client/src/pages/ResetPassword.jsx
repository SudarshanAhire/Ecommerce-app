import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/reset-password", { token, password });
      toast.success(data.message || "Password reset successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Reset password</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Enter your new password below.</p>
        
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white/50 p-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-blue-400 transition-all" 
              type="password" 
              placeholder="New password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-70" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
