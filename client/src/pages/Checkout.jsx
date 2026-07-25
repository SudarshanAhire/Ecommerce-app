import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
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
        name: user?.name || "Customer",
        email: user?.email || "",
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
    <section className="mx-auto max-w-6xl px-4 py-16 dark:text-slate-100">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Shipping Address</label>
            <textarea 
              className="w-full rounded-xl border border-slate-300 bg-transparent p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400" 
              placeholder="Enter your full shipping address" 
              value={form.shippingAddress} 
              onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} 
              required 
              rows={4}
            />
          </div>
          
          <div className="mt-6">
            <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">Payment Method</label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={`cursor-pointer rounded-xl border p-4 transition-all ${form.paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" value="cod" checked={form.paymentMethod === 'cod'} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">Cash on Delivery</span>
                </div>
              </label>
              
              <label className={`cursor-pointer rounded-xl border p-4 transition-all ${form.paymentMethod === 'razorpay' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" value="razorpay" checked={form.paymentMethod === 'razorpay'} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">Pay Online (Razorpay)</span>
                </div>
              </label>
            </div>
          </div>
          
          {errorMessage && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">{errorMessage}</p>}
          
          <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-70" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
        
        <div className="h-fit rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                  </div>
                  <span className="font-medium">{item.name} <span className="text-slate-400">× {item.quantity}</span></span>
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t border-slate-200 dark:border-slate-700 pt-6 text-lg font-bold text-slate-900 dark:text-slate-100">
            <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
