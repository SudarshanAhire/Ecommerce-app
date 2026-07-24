const crypto = require("crypto");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { getRazorpayClient } = require("../utils/razorpay");

const calculateOrderAmount = async (items) => {
  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  let total = 0;
  for (const item of items) {
    const product = productMap.get(item.product.toString());
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    total += product.price * item.quantity;
  }

  return total;
};

const createRazorpayOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = await calculateOrderAmount(items);

    if (paymentMethod !== "razorpay") {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return res.status(500).json({ message: "Razorpay is not configured on the server. Add your Razorpay key ID and key secret to continue with online payment." });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        user: req.user._id.toString(),
        shippingAddress,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      receipt: razorpayOrder.receipt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, shippingAddress, paymentMethod } = req.body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay is not configured on the server. Add your Razorpay key ID and key secret to continue with online payment." });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const totalAmount = await calculateOrderAmount(items);

    const existingOrder = await Order.findOne({
      "paymentDetails.razorpayOrderId": razorpay_order_id,
    });

    if (existingOrder) {
      existingOrder.status = "paid";
      existingOrder.paymentDetails.razorpayPaymentId = razorpay_payment_id;
      existingOrder.paymentDetails.razorpaySignature = razorpay_signature;
      await existingOrder.save();
      return res.status(200).json(existingOrder);
    }

    const order = await Order.create({
      user: req.user._id,
      items: items.map((item) => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "paid",
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    await Promise.all(
      items.map((item) =>
        Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
      )
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = await calculateOrderAmount(items);

    if (paymentMethod === "cod") {
      const order = await Order.create({
        user: req.user._id,
        items: items.map((item) => ({
          product: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
        totalAmount,
        status: "pending",
      });

      await Promise.all(
        items.map((item) =>
          Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
        )
      );

      return res.status(201).json(order);
    }

    return res.status(400).json({ message: "Use the Razorpay checkout endpoint for online payment" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyOrders,
  getAllOrders,
};