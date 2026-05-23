export default function Cart({ items, onClose, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / 999) * 100, 100);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[400px] z-50 flex flex-col"
        style={{ background: "rgba(10,8,20,0.95)", backdropFilter: "blur(40px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-black text-base">Your Bag</h2>
              <p className="text-gray-600 text-xs">{items.length} item{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-b border-white/[0.05]">
            {subtotal < 999 ? (
              <p className="text-xs text-gray-500 mb-2">
                Add <span className="text-purple-300 font-bold">₹{(999 - subtotal).toLocaleString("en-IN")}</span> more for free shipping ✦
              </p>
            ) : (
              <p className="text-xs text-green-400 font-semibold mb-2">✓ You've unlocked free shipping!</p>
            )}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #a855f7, #ec4899)" }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-3xl mb-5 mx-auto">🛍️</div>
              <p className="text-white font-bold text-base">Your bag is empty</p>
              <p className="text-gray-600 text-sm mt-1">Find something you love ✦</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="glass rounded-2xl p-3 flex gap-3 border border-white/[0.05] hover:border-purple-500/20 transition-colors">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                <p className="text-gray-600 text-[10px] mt-0.5">{item.category}</p>
                <p className="gradient-text font-black text-sm mt-1">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQty(item.id, -1)}
                    className="w-6 h-6 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition text-sm">−</button>
                  <span className="text-white font-bold text-xs w-3 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}
                    className="w-6 h-6 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition text-sm">+</button>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-gray-700 hover:text-red-400 transition self-start text-base mt-0.5">✕</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-white/[0.05] space-y-4">
            <div className="space-y-2">
              {[["Subtotal", `₹${subtotal.toLocaleString("en-IN")}`, "text-gray-400"],
                ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`, shipping === 0 ? "text-green-400" : "text-gray-400"],
              ].map(([label, val, cls]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className={cls + " font-semibold"}>{val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/[0.05]">
                <span className="text-white font-bold">Total</span>
                <span className="gradient-text font-black text-lg">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button onClick={onCheckout}
              className="w-full btn-primary text-white font-black py-4 rounded-2xl text-sm tracking-wide">
              Checkout with Razorpay ✦
            </button>
            <p className="text-center text-[10px] text-gray-700">🔒 Secure payment · SSL encrypted</p>
          </div>
        )}
      </div>
    </>
  );
}