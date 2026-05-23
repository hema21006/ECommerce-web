export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", animationDelay: "1s" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[350px] h-[350px] rounded-full opacity-10 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20 w-full relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="animate-fade-up">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 glass border border-purple-500/20 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              ✦ New Collection is here
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-white">Your</span>
              <br />
              <span className="gradient-text">Aesthetic</span>
              <br />
              <span className="text-white">Awaits</span>
              <span className="text-pink-400"> ✦</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              Discover pieces that tell your story. Curated fashion, dreamy accessories, and styles made for the bold.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button className="btn-primary text-white font-bold px-8 py-3.5 rounded-2xl text-sm">
                Shop Now ✦
              </button>
              <button className="glass border border-white/10 hover:border-purple-500/30 text-white font-medium px-8 py-3.5 rounded-2xl text-sm transition-all hover:bg-white/5">
                View Lookbook →
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-12">
              {[["50K+", "Happy customers"], ["4.9★", "Average rating"], ["Free", "Returns & shipping"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-black text-white">{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating product cards */}
          <div className="relative h-[480px] hidden md:block">
            {/* Main card */}
            <div className="absolute top-8 left-8 right-8 glass-strong rounded-3xl overflow-hidden glow-pink animate-float">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" alt="hero"
                className="w-full h-72 object-cover" />
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base">Summer Edit 2025</p>
                  <p className="text-gray-400 text-sm mt-0.5">New arrivals just dropped</p>
                </div>
                <button className="btn-primary text-white text-xs font-bold px-4 py-2 rounded-xl">Shop →</button>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-4 right-4 glass border border-pink-500/20 rounded-2xl px-4 py-3 animate-float-delay glow-purple">
              <p className="text-xs text-gray-400">Today's deal</p>
              <p className="text-white font-black text-lg">30% OFF</p>
              <p className="text-pink-400 text-xs font-semibold">✦ Limited time</p>
            </div>

            {/* Bottom mini card */}
            <div className="absolute bottom-0 left-4 glass border border-purple-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Nebula Sneakers</p>
                <p className="text-purple-400 text-xs font-bold">₹4,999</p>
              </div>
              <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg font-semibold">In Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04] py-3 overflow-hidden bg-white/[0.01]">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {Array(3).fill(["✦ Free shipping on orders above ₹999", "✦ New drops every Friday", "✦ Easy 30-day returns", "✦ Pay with Razorpay", "✦ Exclusive member perks"]).flat().map((t, i) => (
            <span key={i} className="text-xs text-purple-400/50 font-medium tracking-widest uppercase">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}