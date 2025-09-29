const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(" DataBase Connection Succesfull");
  })
  .catch((err) => {
    console.log("Datbase Connection unsucesfull", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
