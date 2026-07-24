import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">Explore the latest deals and add a few favorites.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-lg border px-3 py-1" onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button className="rounded-lg border px-3 py-1" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <button className="text-sm font-semibold text-red-600" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          </div>
          <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="mt-6 inline-flex w-full justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white">Proceed to Checkout</Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
