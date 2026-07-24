import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>Status: {order.status}</p>
                <p>Total: ₹{order.totalAmount?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
