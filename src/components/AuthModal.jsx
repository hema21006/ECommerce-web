import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md glass-strong rounded-3xl p-8 border border-white/[0.08]"
          style={{ boxShadow: "0 25px 80px rgba(168,85,247,0.2)" }}>

          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 glass rounded-full flex items-center justify-center text-gray-500 hover:text-white transition text-sm">
            ✕
          </button>

          {/* Orb decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }} />

          {mode === "login"
            ? <Login onSwitch={() => setMode("signup")} onClose={onClose} />
            : <Signup onSwitch={() => setMode("login")} onClose={onClose} />
          }
        </div>
      </div>
    </>
  );
}