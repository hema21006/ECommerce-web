import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, onAdd, onClick }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="group cursor-pointer" onClick={() => onClick(product)}>
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-white aspect-[3/4] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${product.inStock ? "group-hover:scale-105" : "grayscale opacity-60"}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge === "New" && <span className="badge-new text-[10px] font-bold px-2.5 py-1 rounded-full">NEW</span>}
          {product.badge === "Sale" && <span className="badge-sale text-[10px] font-bold px-2.5 py-1 rounded-full">SALE</span>}
          {product.badge === "Best Seller" && <span className="badge-best text-[10px] font-bold px-2.5 py-1 rounded-full">BEST</span>}
          {discount > 0 && (
            <span className="bg-white text-[#0d0d0d] text-[10px] font-bold px-2.5 py-1 rounded-full border border-black/10">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist heart */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
            wishlisted
              ? "bg-red-50 border-red-100 text-red-400 opacity-100"
              : "bg-white/90 border-black/[0.06] text-[#6b6b6b] hover:text-red-400 opacity-0 group-hover:opacity-100"
          }`}>
          <svg className="w-3.5 h-3.5" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/90 text-[#0d0d0d] text-xs font-bold px-4 py-2 rounded-full border border-black/10">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={e => { e.stopPropagation(); onAdd(product); }}
              className="w-full bg-[#0d0d0d] text-[#f5f0e8] text-xs font-semibold py-2.5 rounded-lg tracking-wide hover:bg-[#1a1a1a] transition">
              + Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-[10px] text-[#6b6b6b] font-semibold tracking-widest uppercase mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-[#0d0d0d] leading-snug mb-2">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={`w-2.5 h-2.5 ${i <= Math.round(product.rating) ? "text-[#c8a882]" : "text-[#d4d0c8]"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
          <span className="text-[10px] text-[#6b6b6b] ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0d0d0d]">₹{product.price.toLocaleString("en-IN")}</span>
          {discount > 0 && (
            <span className="text-xs text-[#6b6b6b] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}