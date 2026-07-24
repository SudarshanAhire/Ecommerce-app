import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/reset-password", { token, password });
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <form className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Reset password</h1>
        <input className="mt-6 w-full rounded-lg border p-3" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white" type="submit">Reset password</button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </section>
  );
}

export default ResetPassword;
