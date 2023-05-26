const express = require("express");
var cors = require("cors");
const connectToMongo = require("./config/db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
connectToMongo();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
 
// app.use(morgan("dev"));

app.use(express.json());
app.use(cors());
const PORT = 3001;

//Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use((req, res, next) => {
  req.requestTime=new Date().toISOString()
  next();
});
app.get("/", (req, res) => {
  res.send("Sup nigga?");
});
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
