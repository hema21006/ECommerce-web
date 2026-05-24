import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL"];

const DESCRIPTIONS = {
  "Apparel": "Crafted from premium breathable fabric with a relaxed silhouette. Designed for effortless everyday wear — pairs beautifully with tailored trousers or denim.",
  "Footwear": "Engineered for all-day comfort with a cushioned sole and premium upper material. A versatile silhouette that elevates any outfit effortlessly.",
  "Accessories": "A timeless piece that adds a refined finishing touch to any look. Designed with precision and attention to detail.",
  "Bags": "Spacious yet structured, made from durable premium material. Features multiple compartments for organised, stylish carry.",
};

export default function ProductDetail({ product, onAdd, onClose }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const images = [product.image, product.image, product.image];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f5f0e8] overflow-y-auto animate-fade-in">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-black/[0.06] px-5 h-14 flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 text-sm font-medium text-[#6b6b6b] hover:text-[#0d0d0d] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <span className="font-editorial text-base font-semibold text-[#0d0d0d]">bliss<span className="text-[#c8a882]">.</span></span>
        <button onClick={onClose} className="text-[#6b6b6b] hover:text-[#0d0d0d] transition text-lg">✕</button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Images */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white">
              <img src={images[activeImg]} alt={product.name}
                className="w-full h-full object-cover" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${activeImg === i ? "border-[#0d0d0d]" : "border-transparent"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="py-4">
            {/* Category + badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="tag">{product.category}</span>
              {product.badge && (
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${
                  product.badge === "New" ? "badge-new" :
                  product.badge === "Sale" ? "badge-sale" : "badge-best"
                }`}>{product.badge}</span>
              )}
            </div>

            {/* Name */}
            <h1 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0d0d0d] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(product.rating) ? "text-[#c8a882]" : "text-[#d4d0c8]"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#6b6b6b]">{product.rating} · {product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[#0d0d0d]">₹{product.price.toLocaleString("en-IN")}</span>
              {discount > 0 && (
                <>
                  <span className="text-base text-[#6b6b6b] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-[#e8544a] bg-red-50 px-2 py-1 rounded-full">{discount}% OFF</span>
                </>
              )}
            </div>

            <div className="divider mb-8" />

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold tracking-widest uppercase text-[#0d0d0d]">Size</p>
                <button className="text-xs text-[#c8a882] font-semibold hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-[#0d0d0d] text-[#f5f0e8] border-[#0d0d0d]"
                        : "bg-white text-[#0d0d0d] border-black/10 hover:border-black/30"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-[#0d0d0d] mb-3">Quantity</p>
              <div className="flex items-center gap-3 bg-white border border-black/10 rounded-lg w-fit px-4 py-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="text-[#6b6b6b] hover:text-[#0d0d0d] transition font-bold text-lg w-6 flex items-center justify-center">−</button>
                <span className="text-sm font-bold text-[#0d0d0d] w-6 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="text-[#6b6b6b] hover:text-[#0d0d0d] transition font-bold text-lg w-6 flex items-center justify-center">+</button>
              </div>
            </div>

            {/* Add to cart */}
            {product.inStock ? (
              <button onClick={handleAdd}
                className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-[#0d0d0d] text-[#f5f0e8] hover:bg-[#1a1a1a]"
                }`}>
                {added ? "✓ Added to Bag!" : `Add to Bag · ₹${(product.price * qty).toLocaleString("en-IN")}`}
              </button>
            ) : (
              <button disabled className="w-full py-4 rounded-xl text-sm font-bold bg-black/5 text-[#6b6b6b] cursor-not-allowed">
                Sold Out
              </button>
            )}

            {/* Wishlist */}
            <button className="w-full mt-3 py-4 rounded-xl text-sm font-semibold border border-black/10 hover:border-black/20 text-[#0d0d0d] transition flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Add to Wishlist
            </button>

            <div className="divider my-8" />

            {/* Description */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest uppercase text-[#0d0d0d] mb-3">About this piece</p>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                {DESCRIPTIONS[product.category] || DESCRIPTIONS["Apparel"]}
              </p>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Above ₹999" },
                { icon: "↩️", label: "Easy Returns", sub: "30 days" },
                { icon: "🔒", label: "Secure Pay", sub: "Razorpay" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white border border-black/[0.06] rounded-xl p-3 text-center">
                  <span className="text-xl">{icon}</span>
                  <p className="text-[10px] font-bold text-[#0d0d0d] mt-1">{label}</p>
                  <p className="text-[10px] text-[#6b6b6b]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}