import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup({ onSwitch, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
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
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 btn-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl">✦</span>
        </div>
        <h2 className="text-2xl font-black text-white">Create account</h2>
        <p className="text-gray-500 text-sm mt-1">Join blissshop today — it's free ✦</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { key: "name", label: "Full Name", type: "text", placeholder: "Hema Varshini" },
          { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { key: "password", label: "Password", type: "password", placeholder: "Min 6 characters" },
          { key: "confirm", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              required
              className="input-glow w-full glass border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm transition-all"
            />
          </div>
        ))}

        <button type="submit" disabled={loading}
          className="w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2">
          {loading ? "Creating account..." : "Create Account ✦"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button onClick={onSwitch} className="gradient-text font-bold hover:opacity-80 transition">
          Sign in
        </button>
      </p>
    </div>
  );
}