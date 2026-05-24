import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login({ onSwitch, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("http://localhost:8083/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Login failed");
      else { login({ name: data.name, email: data.email }, data.token); onClose(); }
    } catch { setError("Cannot connect to server"); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-editorial text-2xl font-semibold text-[#0d0d0d]">Welcome back</h2>
        <p className="text-[#6b6b6b] text-sm mt-1">Sign in to your bliss account</p>
      </div>
      {error && <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-bold tracking-widest uppercase text-[#6b6b6b] mb-2 block">{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })} required
              className="input-field" />
          </div>
        ))}
        <button type="submit" disabled={loading} className="btn-dark w-full text-center disabled:opacity-50">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-center text-sm text-[#6b6b6b]">
        New here?{" "}
        <button onClick={onSwitch} className="font-bold text-[#0d0d0d] hover:text-[#c8a882] transition">Create account</button>
      </p>
    </div>
  );
}

function Signup({ onSwitch, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords don't match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8083/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Registration failed");
      else { login({ name: data.name, email: data.email }, data.token); onClose(); }
    } catch { setError("Cannot connect to server"); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-editorial text-2xl font-semibold text-[#0d0d0d]">Create account</h2>
        <p className="text-[#6b6b6b] text-sm mt-1">Join bliss — it's free</p>
      </div>
      {error && <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
          { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { key: "password", label: "Password", type: "password", placeholder: "Min 6 characters" },
          { key: "confirm", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-bold tracking-widest uppercase text-[#6b6b6b] mb-2 block">{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })} required
              className="input-field" />
          </div>
        ))}
        <button type="submit" disabled={loading} className="btn-dark w-full text-center disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="text-center text-sm text-[#6b6b6b]">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-bold text-[#0d0d0d] hover:text-[#c8a882] transition">Sign in</button>
      </p>
    </div>
  );
}

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#f5f0e8] rounded-3xl p-8 border border-black/[0.06] shadow-2xl animate-fade-up"
          style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.15)" }}>
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#6b6b6b] hover:text-[#0d0d0d] transition text-sm">
            ✕
          </button>
          {mode === "login"
            ? <Login onSwitch={() => setMode("signup")} onClose={onClose} />
            : <Signup onSwitch={() => setMode("login")} onClose={onClose} />
          }
        </div>
      </div>
    </>
  );
}