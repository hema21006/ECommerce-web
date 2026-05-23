import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Toast from "./components/Toast";
import AuthModal from "./components/AuthModal";

const DEMO_PRODUCTS = [
  { id: 1, name: "Quantum Hoodie", price: 2499, originalPrice: 3200, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400", category: "Apparel", rating: 4.5, reviews: 128, inStock: true, badge: "Best Seller" },
  { id: 2, name: "Nebula Sneakers", price: 4999, originalPrice: 6000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Footwear", rating: 4.8, reviews: 256, inStock: true, badge: "New" },
  { id: 3, name: "Void Watch", price: 8999, originalPrice: 8999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Accessories", rating: 4.2, reviews: 89, inStock: true, badge: "" },
  { id: 4, name: "Prism Bag", price: 3299, originalPrice: 4000, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", category: "Bags", rating: 4.6, reviews: 74, inStock: false, badge: "Sale" },
  { id: 5, name: "Echo Tee", price: 999, originalPrice: 1200, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "Apparel", rating: 4.0, reviews: 312, inStock: true, badge: "Sale" },
  { id: 6, name: "Flux Sunglasses", price: 1799, originalPrice: 1799, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400", category: "Accessories", rating: 4.3, reviews: 55, inStock: true, badge: "" },
  { id: 7, name: "Storm Cap", price: 799, originalPrice: 1000, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400", category: "Apparel", rating: 3.9, reviews: 43, inStock: true, badge: "Sale" },
  { id: 8, name: "Orbit Backpack", price: 5499, originalPrice: 5499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Bags", rating: 4.7, reviews: 198, inStock: true, badge: "Best Seller" },
  { id: 9, name: "Luna Dress", price: 3799, originalPrice: 4500, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400", category: "Apparel", rating: 4.4, reviews: 167, inStock: true, badge: "New" },
  { id: 10, name: "Steel Boots", price: 6999, originalPrice: 8000, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400", category: "Footwear", rating: 4.6, reviews: 92, inStock: false, badge: "" },
  { id: 11, name: "Neon Belt", price: 599, originalPrice: 800, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", category: "Accessories", rating: 4.1, reviews: 38, inStock: true, badge: "Sale" },
  { id: 12, name: "Cloud Wallet", price: 1299, originalPrice: 1299, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", category: "Bags", rating: 4.5, reviews: 221, inStock: true, badge: "" },
];

const CATEGORIES = ["All", "Apparel", "Footwear", "Accessories", "Bags"];

function ShopApp() {
  const { user, getToken } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filtered = DEMO_PRODUCTS
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= priceRange)
    .filter(p => !onlyInStock || p.inStock)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product) => {
    if (!product.inStock) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✦ ${product.name} added to bag!`);
  };

  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleCheckout = async () => {
    // Must be logged in to checkout
    if (!user) {
      setCartOpen(false);
      setAuthOpen(true);
      showToast("Please sign in to checkout ✦");
      return;
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    try {
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ amount: total, currency: "INR" }),
      });
      const order = await res.json();

      new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "BlissShop",
        order_id: order.id,
        prefill: { name: user.name, email: user.email },
        handler: async (response) => {
          await fetch("http://localhost:8080/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify(response),
          });
          setCart([]);
          setCartOpen(false);
          showToast("🎉 Payment successful! Order confirmed.");
        },
        theme: { color: "#a855f7" },
      }).open();
    } catch {
      showToast("⚠ Connect backend to enable payments.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080612] text-white">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
      />
      <Hero onShopClick={() => setAuthOpen(!user)} />
      <Filters
        search={search} setSearch={setSearch}
        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        categories={CATEGORIES} priceRange={priceRange} setPriceRange={setPriceRange}
        sortBy={sortBy} setSortBy={setSortBy}
        onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock}
        totalResults={filtered.length}
      />

      <div className="max-w-7xl mx-auto px-5 mb-6 flex items-center gap-3">
        <h2 className="text-white font-black text-xl">All Products</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-xs text-gray-600">{filtered.length} items</span>
      </div>

      <section className="max-w-7xl mx-auto px-5 pb-28">
        {filtered.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white font-bold text-lg">Nothing found</p>
            <p className="text-gray-600 text-sm mt-2">Try different filters ✦</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
          </div>
        )}
      </section>

      {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={handleCheckout} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShopApp />
    </AuthProvider>
  );
}