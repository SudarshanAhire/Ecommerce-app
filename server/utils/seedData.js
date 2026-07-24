const Category = require("../models/Category");
const Product = require("../models/Product");

const seedData = async () => {
  const categoryCount = await Category.countDocuments();
  const productCount = await Product.countDocuments();

  let categories = [];

  if (categoryCount === 0) {
    categories = await Category.insertMany([
      { name: "Electronics", description: "Latest gadgets and accessories", image: "https://picsum.photos/300?11" },
      { name: "Fashion", description: "Trendy clothing and styles", image: "https://picsum.photos/300?12" },
      { name: "Home", description: "Modern comfort and decor", image: "https://picsum.photos/300?13" },
      { name: "Sports", description: "Workout and outdoor essentials", image: "https://picsum.photos/300?14" },
    ]);
  } else {
    categories = await Category.find({});
  }

  if (productCount === 0) {
    const products = [
      {
        name: "UltraBook Pro 14",
        description: "A powerful laptop for creators and professionals.",
        price: 129999,
        category: categories[0].name,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
        stock: 12,
        featured: true,
        rating: 4.8,
      },
      {
        name: "Aurora Smartwatch",
        description: "Track health and stay connected on the go.",
        price: 24999,
        category: categories[0].name,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
        stock: 8,
        featured: true,
        rating: 4.6,
      },
      {
        name: "Nova Headphones",
        description: "Immersive sound with adaptive noise cancellation.",
        price: 18999,
        category: categories[0].name,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        stock: 14,
        featured: true,
        rating: 4.7,
      },
      {
        name: "Orbit Speaker",
        description: "Compact wireless speaker with room-filling bass.",
        price: 8999,
        category: categories[0].name,
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
        stock: 18,
        rating: 4.5,
      },
      {
        name: "Luna Sneakers",
        description: "Breathable comfort for everyday movement.",
        price: 7999,
        category: categories[1].name,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        stock: 20,
        rating: 4.4,
      },
      {
        name: "Velvet Street Jacket",
        description: "A sleek everyday staple with premium finish.",
        price: 15999,
        category: categories[1].name,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        stock: 10,
        featured: true,
        rating: 4.6,
      },
      {
        name: "Canvas Carry Bag",
        description: "Minimal, durable, and designed for daily essentials.",
        price: 3499,
        category: categories[1].name,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
        stock: 22,
        rating: 4.2,
      },
      {
        name: "Vista Sofa",
        description: "Minimalist comfort designed for modern homes.",
        price: 45999,
        category: categories[2].name,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        stock: 5,
        rating: 4.7,
      },
      {
        name: "Aura Desk Lamp",
        description: "Warm ambient lighting for focused workspaces.",
        price: 5499,
        category: categories[2].name,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
        stock: 16,
        rating: 4.4,
      },
      {
        name: "Cedar Coffee Table",
        description: "Sculpted wood finish with elegant practicality.",
        price: 18999,
        category: categories[2].name,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        stock: 7,
        rating: 4.5,
      },
      {
        name: "Pulse Running Shoes",
        description: "Responsive support for your daily training pace.",
        price: 6999,
        category: categories[3].name,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        stock: 24,
        featured: true,
        rating: 4.3,
      },
      {
        name: "Flex Yoga Mat",
        description: "Comfortable grip and premium texture for every session.",
        price: 3499,
        category: categories[3].name,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        stock: 29,
        rating: 4.4,
      },
      {
        name: "Storm Fitness Bottle",
        description: "Insulated hydration for workouts and travel.",
        price: 1999,
        category: categories[3].name,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
        stock: 30,
        rating: 4.1,
      },
    ];

    await Product.insertMany(products);
  }
};

module.exports = seedData;
