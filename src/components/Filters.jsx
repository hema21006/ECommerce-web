export default function Filters({
  search, setSearch,
  activeCategory, setActiveCategory, categories,
  priceRange, setPriceRange,
  sortBy, setSortBy,
  onlyInStock, setOnlyInStock,
  totalResults
}) {
  return (
    <section className="max-w-7xl mx-auto px-5 py-8">

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search for something cute..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-glow w-full glass border border-white/[0.07] rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all text-sm"
        />
        {search && (
          <button onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition text-lg leading-none">×</button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "btn-primary text-white shadow-lg"
                : "glass border border-white/[0.07] text-gray-400 hover:text-white hover:border-purple-500/30"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-3 flex-wrap">

          {/* Price */}
          <div className="glass border border-white/[0.07] rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <span className="text-xs text-gray-500">Price</span>
            <input type="range" min="500" max="10000" step="500"
              value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
              className="w-20 accent-purple-500" />
            <span className="text-xs font-bold gradient-text whitespace-nowrap">₹{priceRange.toLocaleString("en-IN")}</span>
          </div>

          {/* In stock */}
          <button onClick={() => setOnlyInStock(!onlyInStock)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
              onlyInStock
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "glass border-white/[0.07] text-gray-500 hover:text-white"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${onlyInStock ? "bg-green-400" : "bg-gray-700"}`} />
            In Stock
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600">{totalResults} items</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="glass border border-white/[0.07] text-gray-400 text-xs rounded-2xl px-3 py-2.5 outline-none focus:border-purple-500/50 transition cursor-pointer bg-transparent">
            <option value="default" className="bg-[#0f0f1a]">Sort: Default</option>
            <option value="price-asc" className="bg-[#0f0f1a]">Price ↑</option>
            <option value="price-desc" className="bg-[#0f0f1a]">Price ↓</option>
            <option value="rating" className="bg-[#0f0f1a]">Top Rated</option>
          </select>
        </div>
      </div>
    </section>
  );
}