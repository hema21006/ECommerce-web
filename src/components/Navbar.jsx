import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ cartCount, onCartClick, onAuthClick }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-xs">✦</span>
          </div>
          <span className="font-black text-lg tracking-tight">
            <span className="text-white">bliss</span>
            <span className="gradient-text">shop</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {["Home", "New In", "Collections", "Sale ✦"].map(link => (
            <a key={link} href="#"
              className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium">
              {link}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          {/* Wishlist */}
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          {/* User — show dropdown if logged in, else show login button */}
          {user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 glass border border-white/10 hover:border-purple-500/30 px-3 py-2 rounded-xl transition-all">
                <div className="w-6 h-6 btn-primary rounded-lg flex items-center justify-center text-white text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-xs font-semibold hidden sm:block max-w-[80px] truncate">{user.name}</span>
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 glass-strong border border-white/10 rounded-2xl p-2 w-48 shadow-2xl"
                  style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                  <div className="px-3 py-2 border-b border-white/[0.05] mb-1">
                    <p className="text-white text-xs font-bold truncate">{user.name}</p>
                    <p className="text-gray-600 text-[10px] truncate">{user.email}</p>
                  </div>
                  {[
                    { icon: "📦", label: "My Orders" },
                    { icon: "♡", label: "Wishlist" },
                    { icon: "👤", label: "Profile" },
                  ].map(({ icon, label }) => (
                    <button key={label}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition text-xs font-medium text-left">
                      <span>{icon}</span>{label}
                    </button>
                  ))}
                  <div className="border-t border-white/[0.05] mt-1 pt-1">
                    <button onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition text-xs font-medium text-left">
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onAuthClick}
              className="glass border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all">
              Sign In
            </button>
          )}

          {/* Cart */}
          <button onClick={onCartClick}
            className="relative btn-primary flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-bold ml-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Bag
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-purple-600 text-[10px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}