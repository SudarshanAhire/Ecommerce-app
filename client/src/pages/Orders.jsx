import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (error) {
        // Suppress console logs in production
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50";
      case "paid": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
      case "shipped": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Orders</h1>
      
      {!Array.isArray(orders) || orders.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">No orders yet</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Looks like you haven&apos;t placed any orders.</p>
        </div>
      ) : (
        <motion.div 
          className="mt-8 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {orders.map((order) => (
            <motion.div 
              key={order._id} 
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="border-b border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Amount</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Items Ordered</h4>
                <div className="space-y-3">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {item.quantity}x
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                {order.shippingAddress && (
                  <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Shipping Address</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{order.shippingAddress}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Orders;
