import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ shippingAddress: "", paymentMethod: "cod" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayReady(true);
      return;
    }

    const existingScript = document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']");
    if (existingScript) {
      existingScript.addEventListener("load", () => setRazorpayReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => setErrorMessage("Unable to load Razorpay. Please check your network connection.");
    document.body.appendChild(script);
  }, []);

  const placeCodOrder = async () => {
    const { data } = await api.post("/orders", {
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: form.shippingAddress,
      paymentMethod: "cod",
    });

    clearCart();
    navigate("/orders");
    return data;
  };

  const placeRazorpayOrder = async () => {
    if (!razorpayReady || !window.Razorpay) {
      setErrorMessage("Razorpay is still loading. Please try again in a moment.");
      return;
    }

    const { data } = await api.post("/orders/razorpay", {
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: form.shippingAddress,
      paymentMethod: "razorpay",
    });

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      name: "ShopHub",
      description: "Order Payment",
      handler: async (response) => {
        try {
          await api.post("/orders/razorpay/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            items: cartItems.map((item) => ({
              product: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            shippingAddress: form.shippingAddress,
            paymentMethod: "razorpay",
          });
          clearCart();
          navigate("/orders");
        } catch (error) {
          setErrorMessage(error.response?.data?.message || "Payment verification failed.");
        }
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
      },
      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      if (form.paymentMethod === "razorpay") {
        await placeRazorpayOrder();
      } else {
        await placeCodOrder();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Unable to process your order right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="rounded-2xl border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <textarea className="mt-6 w-full rounded-lg border p-3" placeholder="Shipping address" value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} required />
          <select className="mt-4 w-full rounded-lg border p-3" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            <option value="cod">Cash on Delivery</option>
            <option value="razorpay">Razorpay</option>
          </select>
          {errorMessage && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}
          <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white" type="submit" disabled={loading}>{loading ? "Processing..." : "Place Order"}</button>
        </form>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
            <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
