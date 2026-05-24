import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext_temp";

export default function Navbar({ cartCount, onCartClick, onAuthClick, onOrdersClick, onWishlistClick }) {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="font-editorial text-4xl font-semibold text-[#0d0d0d] tracking-tight">
          bliss<span className="text-[#c8a882]">.</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["New In", "Collections", "Apparel", "Accessories", "Sale"].map(link => (
            <a key={link} href="#"
              className="text-xs font-semibold tracking-widest uppercase text-[#6b6b6b] hover:text-[#0d0d0d] transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">

          {/* Search */}
          <button className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-[#0d0d0d] transition rounded-full hover:bg-black/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          {/* Wishlist with count */}
          <button
            onClick={onWishlistClick}
            className="relative w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-red-400 transition rounded-full hover:bg-red-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-black/5 transition">
                <div className="w-6 h-6 bg-[#0d0d0d] rounded-full flex items-center justify-center text-[#f5f0e8] text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-[#0d0d0d] hidden sm:block max-w-[70px] truncate">
                  {user.name}
                </span>
                <svg className="w-3 h-3 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-11 bg-white border border-black/[0.08] rounded-2xl shadow-xl w-52 py-2 animate-fade-in"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
                  <div className="px-4 py-3 border-b border-black/[0.06]">
                    <p className="text-xs font-bold text-[#0d0d0d]">{user.name}</p>
                    <p className="text-[11px] text-[#6b6b6b] mt-0.5 truncate">{user.email}</p>
                  </div>
                  {[
                    { icon: "📦", label: "My Orders", action: () => { onOrdersClick(); setDropdownOpen(false); } },
                    { icon: "♡", label: "Wishlist", action: () => { onWishlistClick(); setDropdownOpen(false); } },
                    { icon: "👤", label: "Profile", action: () => setDropdownOpen(false) },
                  ].map(({ icon, label, action }) => (
                    <button key={label} onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-black/[0.03] transition text-left">
                      <span>{icon}</span>{label}
                    </button>
                  ))}
                  <div className="border-t border-black/[0.06] mt-1 pt-1">
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-50 transition text-left">
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onAuthClick}
              className="text-xs font-semibold tracking-wide text-[#0d0d0d] px-4 py-2 rounded-full border border-black/20 hover:border-black/40 transition">
              Sign In
            </button>
          )}

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-[#0d0d0d] text-[#f5f0e8] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition hover:bg-[#1a1a1a] ml-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Bag
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c8a882] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}