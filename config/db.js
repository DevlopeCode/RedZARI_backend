const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb Atlas!");
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};
module.exports = connectToMongo;
