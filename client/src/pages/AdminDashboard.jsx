import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { HiOutlineCube, HiOutlineClipboardDocumentList, HiOutlineCurrencyRupee } from "react-icons/hi2";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([api.get("/products"), api.get("/orders")]);
        setProducts(productsRes.data.products || []);
        setOrders(ordersRes.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const recentOrders = orders.slice(0, 5);

  const stats = [
    { name: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: "from-purple-500 to-indigo-500", bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
    { name: "Total Orders", value: orders.length, icon: HiOutlineClipboardDocumentList, color: "from-green-400 to-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
    { name: "Total Products", value: products.length, icon: HiOutlineCube, color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Overview of your store&apos;s performance</p>
        </div>
      </div>

      <motion.div 
        className="grid gap-6 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-2xl dark:opacity-30`} />
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}>
                <stat.icon className={`h-7 w-7 ${stat.text}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <motion.div 
          className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-100">₹{order.totalAmount?.toLocaleString()}</td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div 
          className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center justify-between rounded-xl bg-slate-50 p-4 text-left font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800">
              Add New Product
              <span className="text-xl">+</span>
            </button>
            <button className="w-full flex items-center justify-between rounded-xl bg-slate-50 p-4 text-left font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800">
              View All Orders
              <span className="text-xl">→</span>
            </button>
            <button className="w-full flex items-center justify-between rounded-xl bg-slate-50 p-4 text-left font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800">
              Manage Users
              <span className="text-xl">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AdminDashboard;
