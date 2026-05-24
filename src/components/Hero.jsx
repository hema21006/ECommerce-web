export default function Hero({ onShopClick }) {
  return (
    <section className="bg-[#f5f0e8] overflow-hidden">

      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="animate-fade-up">
            <div className="tag mb-8">✦ SS 2025 Collection</div>

            <h1 className="font-editorial text-6xl md:text-8xl font-semibold leading-[1.0] tracking-tight text-[#0d0d0d] mb-8">
              Dress<br />
              <em className="text-[#c8a882]">simply</em>,<br />
              live fully.
            </h1>

            <p className="text-[#6b6b6b] text-base leading-relaxed mb-10 max-w-sm">
              Minimal pieces for the modern soul. Thoughtfully designed, endlessly wearable.
            </p>

            <div className="flex items-center gap-4">
              <button onClick={onShopClick} className="btn-dark">Shop Now</button>
              <button className="btn-outline">View Lookbook</button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-black/[0.08]">
              {[["2,400+", "Styles"], ["98%", "Satisfaction"], ["Free", "Returns"]].map(([val, label]) => (
                <div key={label}>
                  <p className="font-editorial text-2xl font-semibold text-[#0d0d0d]">{val}</p>
                  <p className="text-xs text-[#6b6b6b] mt-1 tracking-wider uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — editorial image collage */}
          <div className="relative h-[520px] hidden md:block">
            {/* Main image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=90"
                alt="hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card 1 */}
            <div className="absolute -left-8 bottom-16 bg-white rounded-2xl p-4 shadow-xl w-48 border border-black/[0.06]">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
                alt="" className="w-full h-24 object-cover rounded-xl mb-3" />
              <p className="text-xs font-bold text-[#0d0d0d]">Nebula Sneakers</p>
              <p className="text-xs text-[#c8a882] font-semibold mt-0.5">₹4,999</p>
            </div>

            {/* Floating tag */}
            <div className="absolute top-6 -right-4 bg-[#0d0d0d] text-[#f5f0e8] rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-[10px] tracking-widest uppercase text-[#c8a882]">Today only</p>
              <p className="text-2xl font-black mt-0.5">30%</p>
              <p className="text-[10px] text-[#f5f0e8]/70 mt-0.5">OFF select items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="border-t border-black/[0.06] bg-white/50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {[
            { emoji: "👗", label: "Dresses" },
            { emoji: "👟", label: "Sneakers" },
            { emoji: "👜", label: "Bags" },
            { emoji: "⌚", label: "Watches" },
            { emoji: "🧥", label: "Outerwear" },
            { emoji: "💍", label: "Jewellery" },
            { emoji: "🧣", label: "Scarves" },
          ].map(({ emoji, label }) => (
            <button key={label}
              className="flex items-center gap-2 bg-white border border-black/[0.08] hover:border-black/20 px-4 py-2 rounded-full text-xs font-semibold text-[#0d0d0d] whitespace-nowrap transition-all hover:shadow-sm">
              <span>{emoji}</span>{label}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-black/[0.06] bg-[#0d0d0d] py-2.5 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {Array(4).fill(["✦ Free shipping above ₹999", "✦ New drops every Friday", "✦ Easy 30-day returns", "✦ Handpicked styles", "✦ Secure Razorpay checkout"]).flat().map((t, i) => (
            <span key={i} className="text-[10px] text-[#f5f0e8]/50 font-semibold tracking-widest uppercase">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}