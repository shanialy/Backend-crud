const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemController = require("./controllers/itemController");
require("dotenv").config();
const { body } = require("express-validator");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
app.get("/api/items", itemController.getItems);
app.get("/api/items/:id", itemController.getItemById);
app.post(
  "/api/items",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  itemController.createItem
);
app.put(
  "/api/items/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  itemController.updateItem
);
app.delete("/api/items/:id", itemController.deleteItem);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
