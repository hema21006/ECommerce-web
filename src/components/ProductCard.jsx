export default function ProductCard({ product, onAdd }) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const badgeStyle = {
    "Best Seller": "bg-amber-500/20 text-amber-300 border-amber-500/20",
    "New": "bg-blue-500/20 text-blue-300 border-blue-500/20",
    "Sale": "bg-pink-500/20 text-pink-300 border-pink-500/20",
  };

  return (
    <div className={`group relative glass rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
      product.inStock
        ? "hover:border-purple-500/30 hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]"
        : "opacity-60"
    }`}>

      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-white/[0.02]">
        <img src={product.image} alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${product.inStock ? "group-hover:scale-110" : "grayscale"}`} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080612] via-transparent to-transparent opacity-80" />

        {/* Top left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${badgeStyle[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-green-500/20 text-green-300 border-green-500/20">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center text-gray-500 hover:text-pink-400 transition-all opacity-0 group-hover:opacity-100 hover:bg-pink-500/10">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="glass border border-white/10 text-gray-400 text-xs font-bold px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add — slides up on hover */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={() => onAdd(product)}
              className="w-full btn-primary text-white text-xs font-bold py-2.5 rounded-xl">
              + Add to Bag
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 pt-3">
        <p className="text-[10px] text-purple-400/70 font-semibold tracking-widest uppercase mb-1">{product.category}</p>
        <h3 className="text-white font-bold text-sm leading-snug mb-2">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={`w-3 h-3 ${i <= Math.round(product.rating) ? "text-amber-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
          <span className="text-[10px] text-gray-600 ml-1">({product.reviews})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="gradient-text font-black text-base">₹{product.price.toLocaleString("en-IN")}</span>
            {discount > 0 && (
              <span className="text-gray-700 text-xs line-through ml-1.5">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
          <button onClick={() => onAdd(product)} disabled={!product.inStock}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${
              product.inStock
                ? "btn-primary text-white"
                : "bg-white/5 text-gray-700 cursor-not-allowed"
            }`}>
            {product.inStock ? "+" : "×"}
          </button>
        </div>
      </div>
    </div>
  );
}