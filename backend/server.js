import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api OK!!");
});

app.get("/api/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${port}`)
);
