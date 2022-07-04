const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://NewHope:nnoovviiyy11@cluster0.vjeoc.mongodb.net/hw-db?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch(() => {
    process.exit(1);
  });
