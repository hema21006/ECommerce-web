import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WishlistProvider } from "./context/Wishlistcontext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Toast from "./components/Toast";
import AuthModal from "./components/AuthModal";
import OrderHistory from "./components/OrderHistory";
import Wishlist from "./components/Wishlist";

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Jump Suit",
    price: 2499,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    category: "Apparel",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Cloud White Sneakers",
    price: 4999,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    category: "Footwear",
    rating: 4.8,
    reviews: 256,
    inStock: true,
    badge: "New"
  },
  {
    id: 3,
    name: "Rolex Watch",
    price: 8999,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80",
    category: "Accessories",
    rating: 4.2,
    reviews: 89,
    inStock: true,
    badge: ""
  },
  {
    id: 4,
    name: "Crescent Moon Bag",
    price: 3299,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Bags",
    rating: 4.6,
    reviews: 74,
    inStock: false,
    badge: "Sale"
  },
  {
    id: 5,
    name: "Striped Trousers",
    price: 999,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    category: "Apparel",
    rating: 4.0,
    reviews: 312,
    inStock: true,
    badge: "Sale"
  },
  {
    id: 6,
    name: "Thin Frame Glasses",
    price: 1799,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
    category: "Accessories",
    rating: 4.3,
    reviews: 55,
    inStock: true,
    badge: ""
  },
 
  {
    id: 8,
    name: "Structured Tote Bag",
    price: 5499,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    category: "Bags",
    rating: 4.7,
    reviews: 198,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: 9,
    name: "Flowy Slip Dress",
    price: 3799,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    category: "Apparel",
    rating: 4.4,
    reviews: 167,
    inStock: true,
    badge: "New"
  },
  {
    id: 10,
    name: "High Heels",
    price: 6999,
    originalPrice: 8000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    category: "Footwear",
    rating: 4.6,
    reviews: 92,
    inStock: false,
    badge: ""
  },
  {
    id: 11,
    name: "Gold Bracelets",
    price: 599,
    originalPrice: 800,
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
    category: "Accessories",
    rating: 4.1,
    reviews: 38,
    inStock: true,
    badge: "Sale"
  },
  {
    id: 12,
    name: "Mini Crossbody Bag",
    price: 1299,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    category: "Bags",
    rating: 4.5,
    reviews: 221,
    inStock: true,
    badge: ""
  },
];

const CATEGORIES = ["All", "Apparel", "Footwear", "Accessories", "Bags"];

function ShopApp() {
  const { user, getToken } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    showToast(`✓ ${product.name} added to bag`);
  };

  const updateQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleCheckout = async () => {
    if (!user) {
      setCartOpen(false);
      setAuthOpen(true);
      showToast("Please sign in to checkout");
      return;
    }
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    try {
      const res = await fetch("https://ecommerce-backend-mgix.onrender.com/api/payment/create-order", {
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
        name: "bliss.",
        order_id: order.id,
        prefill: { name: user.name, email: user.email },
        handler: async (response) => {
          await fetch("https://ecommerce-backend-mgix.onrender.com/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ ...response, items: cart, totalAmount: total }),
          });
          setCart([]);
          setCartOpen(false);
          showToast("🎉 Order confirmed! Thank you.");
        },
        theme: { color: "#0d0d0d" },
      }).open();
    } catch {
      showToast("⚠ Connect backend to enable payments.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
        onOrdersClick={() => setOrdersOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
      />
      <Hero onShopClick={() => !user && setAuthOpen(true)} />
      <Filters
        search={search} setSearch={setSearch}
        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        categories={CATEGORIES} priceRange={priceRange} setPriceRange={setPriceRange}
        sortBy={sortBy} setSortBy={setSortBy}
        onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock}
        totalResults={filtered.length}
      />

      <section className="max-w-7xl mx-auto px-5 py-10 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-editorial text-2xl font-semibold text-[#0d0d0d]">All Products</h2>
          <div className="flex-1 h-px bg-black/[0.06]" />
          <span className="text-xs text-[#6b6b6b]">{filtered.length} items</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-editorial text-xl font-semibold text-[#0d0d0d]">Nothing found</p>
            <p className="text-[#6b6b6b] text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} onClick={setSelectedProduct} />
            ))}
          </div>
        )}
      </section>

      {selectedProduct && <ProductDetail product={selectedProduct} onAdd={addToCart} onClose={() => setSelectedProduct(null)} />}
      {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={handleCheckout} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {ordersOpen && <OrderHistory onClose={() => setOrdersOpen(false)} />}
      {wishlistOpen && <Wishlist onClose={() => setWishlistOpen(false)} onAddToCart={addToCart} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <ShopApp />
      </WishlistProvider>
    </AuthProvider>
  );
}