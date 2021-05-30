import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api OK!!");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${port}`)
);
