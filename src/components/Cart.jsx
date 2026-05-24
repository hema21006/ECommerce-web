export default function Cart({ items, onClose, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / 999) * 100, 100);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-[#f5f0e8] z-50 flex flex-col animate-slide-right border-l border-black/[0.06]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
          <div>
            <h2 className="font-editorial text-xl font-semibold text-[#0d0d0d]">Your Bag</h2>
            <p className="text-xs text-[#6b6b6b] mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#6b6b6b] hover:text-[#0d0d0d] transition text-sm">
            ✕
          </button>
        </div>

        {/* Free shipping bar */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-white/60 border-b border-black/[0.04]">
            {subtotal < 999 ? (
              <p className="text-xs text-[#6b6b6b] mb-2">
                Add <span className="font-bold text-[#0d0d0d]">₹{(999 - subtotal).toLocaleString("en-IN")}</span> more for free shipping
              </p>
            ) : (
              <p className="text-xs text-green-600 font-semibold mb-2">✓ You've unlocked free shipping!</p>
            )}
            <div className="h-1 bg-black/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d0d0d] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-3xl mb-5 border border-black/[0.06]">🛍️</div>
              <p className="font-editorial text-lg font-semibold text-[#0d0d0d]">Your bag is empty</p>
              <p className="text-xs text-[#6b6b6b] mt-2">Discover something you love</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-3 border border-black/[0.06]">
              <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#6b6b6b] font-semibold uppercase tracking-wider">{item.category}</p>
                <p className="text-sm font-semibold text-[#0d0d0d] mt-0.5 truncate">{item.name}</p>
                <p className="text-sm font-bold text-[#0d0d0d] mt-1">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQty(item.id, -1)}
                    className="w-6 h-6 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0d0d0d] text-sm font-bold transition">−</button>
                  <span className="text-xs font-bold text-[#0d0d0d] w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}
                    className="w-6 h-6 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0d0d0d] text-sm font-bold transition">+</button>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)}
                className="text-[#6b6b6b] hover:text-red-400 transition self-start text-sm mt-0.5">✕</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/[0.06] bg-white/40 space-y-4">
            <div className="space-y-2">
              {[
                ["Subtotal", `₹${subtotal.toLocaleString("en-IN")}`, "text-[#6b6b6b]"],
                ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`, shipping === 0 ? "text-green-600" : "text-[#6b6b6b]"],
              ].map(([label, val, cls]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[#6b6b6b]">{label}</span>
                  <span className={`font-semibold ${cls}`}>{val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-black/[0.06]">
                <span className="font-bold text-[#0d0d0d]">Total</span>
                <span className="font-bold text-[#0d0d0d] text-lg">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <button onClick={onCheckout} className="btn-dark w-full text-center">
              Checkout · ₹{total.toLocaleString("en-IN")}
            </button>
            <p className="text-center text-[10px] text-[#6b6b6b]">🔒 Secure payment via Razorpay</p>
          </div>
        )}
      </div>
    </>
  );
}