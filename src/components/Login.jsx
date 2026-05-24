import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://ecommerce-backend-mgix.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        login({ name: data.name, email: data.email }, data.token);
        onClose();
      }
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 btn-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl">✦</span>
        </div>
        <h2 className="text-2xl font-black text-white">Welcome back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your blissshop account</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="input-glow w-full glass border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm transition-all"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            className="input-glow w-full glass border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm transition-all"
          />
        </div>

        <button type="submit" disabled={loading}
          className="w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2">
          {loading ? "Signing in..." : "Sign In ✦"}
        </button>
      </form>

      {/* Switch */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="gradient-text font-bold hover:opacity-80 transition">
          Sign up free
        </button>
      </p>
    </div>
  );
}