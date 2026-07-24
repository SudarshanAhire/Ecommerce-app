import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <form className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="mt-2 text-gray-600">Enter your email and we&apos;ll send a reset link.</p>
        <input className="mt-6 w-full rounded-lg border p-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white" type="submit">Send reset link</button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </section>
  );
}

export default ForgotPassword;
