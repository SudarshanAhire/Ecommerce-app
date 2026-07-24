import { useEffect, useState } from "react";
import api from "../services/api";

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

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="mt-2 text-sm text-gray-600">Total products: {products.length}</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-gray-600">Total orders: {orders.length}</p>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
