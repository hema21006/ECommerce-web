import { useWishlist } from "../context/WishlistContext";

export default function Wishlist({ onClose, onAddToCart }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  const discount = (p) => p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#f5f0e8] overflow-y-auto animate-fade-in">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-black/[0.06] px-5 h-14 flex items-center justify-between">
        <button onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-[#6b6b6b] hover:text-[#0d0d0d] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <span className="font-editorial text-base font-semibold text-[#0d0d0d]">
          bliss<span className="text-[#c8a882]">.</span>
        </span>
        <div className="w-16" />
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-editorial text-4xl font-semibold text-[#0d0d0d]">
            Wishlist
            <span className="text-[#c8a882]"> ♡</span>
          </h1>
          <p className="text-[#6b6b6b] text-sm mt-2">
            {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 border border-black/[0.06]">
              ♡
            </div>
            <p className="font-editorial text-2xl font-semibold text-[#0d0d0d]">
              Your wishlist is empty
            </p>
            <p className="text-[#6b6b6b] text-sm mt-2 max-w-xs mx-auto">
              Save pieces you love and come back to them anytime
            </p>
            <button onClick={onClose} className="btn-dark mt-8 inline-block">
              Discover Products
            </button>
          </div>
        ) : (
          <>
            {/* Move all to cart */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  wishlist.filter(p => p.inStock).forEach(p => onAddToCart(p));
                  onClose();
                }}
                className="btn-outline text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Add All to Bag
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {wishlist.map(product => (
                <div key={product.id} className="group">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl bg-white aspect-[3/4] mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? "grayscale opacity-60" : ""}`}
                    />

                    {/* Discount badge */}
                    {discount(product) > 0 && (
                      <span className="absolute top-3 left-3 bg-white text-[#0d0d0d] text-[10px] font-bold px-2.5 py-1 rounded-full border border-black/10">
                        -{discount(product)}%
                      </span>
                    )}

                    {/* Remove from wishlist */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition border border-black/[0.06] shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>

                    {/* Sold out */}
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 text-[#0d0d0d] text-xs font-bold px-4 py-2 rounded-full border border-black/10">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Add to bag hover */}
                    {product.inStock && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={() => { onAddToCart(product); removeFromWishlist(product.id); onClose(); }}
                          className="w-full bg-[#0d0d0d] text-[#f5f0e8] text-xs font-semibold py-2.5 rounded-lg tracking-wide hover:bg-[#1a1a1a] transition">
                          Move to Bag
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-[10px] text-[#6b6b6b] font-semibold tracking-widest uppercase mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-semibold text-[#0d0d0d] leading-snug mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0d0d0d]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {discount(product) > 0 && (
                        <span className="text-xs text-[#6b6b6b] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}