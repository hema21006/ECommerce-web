import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const STATUS_STYLES = {
  "CONFIRMED": "bg-green-50 text-green-600 border-green-100",
  "PROCESSING": "bg-blue-50 text-blue-600 border-blue-100",
  "SHIPPED": "bg-purple-50 text-purple-600 border-purple-100",
  "DELIVERED": "bg-[#c8a882]/10 text-[#a8845e] border-[#c8a882]/20",
  "CANCELLED": "bg-red-50 text-red-500 border-red-100",
};

export default function OrderHistory({ onClose }) {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce-backend-mgix.onrender.com/api/orders/my-orders", {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => { setOrders(DEMO_ORDERS); setLoading(false); });
  }, []);

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
        <span className="font-editorial text-base font-semibold">My Orders</span>
        <div className="w-16" />
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="font-editorial text-3xl font-semibold text-[#0d0d0d]">Order History</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-32 border border-black/[0.06] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📦</div>
            <p className="font-editorial text-xl font-semibold text-[#0d0d0d]">No orders yet</p>
            <p className="text-[#6b6b6b] text-sm mt-2">Your orders will appear here after purchase</p>
            <button onClick={onClose} className="btn-dark mt-6 inline-block">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden hover:border-black/10 transition">
                {/* Order header */}
                <div className="px-6 py-4 border-b border-black/[0.04] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#0d0d0d] tracking-wide">Order #{order.id?.slice(-8).toUpperCase()}</p>
                    <p className="text-[11px] text-[#6b6b6b] mt-0.5">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${STATUS_STYLES[order.status] || STATUS_STYLES["CONFIRMED"]}`}>
                      {order.status || "CONFIRMED"}
                    </span>
                    <span className="text-sm font-bold text-[#0d0d0d]">₹{order.totalAmount?.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-3">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#f5f0e8]" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0d0d0d]">{item.name}</p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">Qty: {item.qty} · ₹{item.price?.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-black/[0.02] border-t border-black/[0.04] flex items-center justify-between">
                  <p className="text-[11px] text-[#6b6b6b]">Payment ID: {order.paymentId?.slice(0, 16)}...</p>
                  <button className="text-xs font-semibold text-[#c8a882] hover:text-[#a8845e] transition">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo orders shown if backend not connected
const DEMO_ORDERS = [
  {
    id: "demo_order_001",
    createdAt: new Date().toISOString(),
    status: "DELIVERED",
    totalAmount: 7498,
    paymentId: "pay_demo_123456789",
    items: [
      { name: "Quantum Hoodie", qty: 2, price: 2499, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200" },
      { name: "Echo Tee", qty: 2, price: 999, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
    ]
  },
  {
    id: "demo_order_002",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "SHIPPED",
    totalAmount: 4999,
    paymentId: "pay_demo_987654321",
    items: [
      { name: "Nebula Sneakers", qty: 1, price: 4999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200" },
    ]
  },
];