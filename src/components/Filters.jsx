export default function Filters({
  search, setSearch,
  activeCategory, setActiveCategory, categories,
  priceRange, setPriceRange,
  sortBy, setSortBy,
  onlyInStock, setOnlyInStock,
  totalResults
}) {
  return (
    <section className="bg-white/50 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 py-5">

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search products..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="input-field pl-11 pr-10" />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#0d0d0d] transition">✕</button>
          )}
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-[#0d0d0d] text-[#f5f0e8]"
                  : "bg-white border border-black/10 text-[#6b6b6b] hover:border-black/20 hover:text-[#0d0d0d]"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 flex-wrap justify-between">
          <div className="flex items-center gap-3 flex-wrap">

            {/* Price */}
            <div className="flex items-center gap-3 bg-white border border-black/10 rounded-full px-4 py-2">
              <span className="text-xs text-[#6b6b6b] font-medium">Max</span>
              <input type="range" min="500" max="10000" step="500"
                value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
                className="w-20 accent-[#0d0d0d]" />
              <span className="text-xs font-bold text-[#0d0d0d] whitespace-nowrap">₹{priceRange.toLocaleString("en-IN")}</span>
            </div>

            {/* In Stock */}
            <button onClick={() => setOnlyInStock(!onlyInStock)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                onlyInStock
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-black/10 text-[#6b6b6b] hover:border-black/20"
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${onlyInStock ? "bg-white" : "bg-[#6b6b6b]"}`} />
              In Stock
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6b6b6b]">{totalResults} items</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-black/10 text-[#6b6b6b] text-xs rounded-full px-4 py-2 outline-none focus:border-black/30 cursor-pointer font-medium">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}