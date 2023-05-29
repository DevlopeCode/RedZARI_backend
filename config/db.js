const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// const connectToMongo = () => {
//   mongoose
//     .connect("mongodb+srv://redzhari:wE5m4qXOSQjOaW3t@cluster0.50gcuib.mongodb.net/test", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Connected to MongoDb Atlas!");
//     })
//     .catch((err) => {
//       console.log("ERROR:", err.message);
//     });
// };
const connectToMongo = () => {
  mongoose
    .connect("mongodb+srv://redzarifashion:pDr48eaQI97v4Wr9@cluster0.cneoo7b.mongodb.net/redzari", {
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
