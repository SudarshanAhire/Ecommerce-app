const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const seedData = require("./utils/seedData");

connectDB().then(() => seedData());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ShopHub server running on port ${PORT}`);
});