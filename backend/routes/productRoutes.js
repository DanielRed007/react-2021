import express from "express";
import Product from "../models/ProductModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json(error);
    }
});
  
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product){
            res.status(200).json(product);
        }     else {
            res.status(404).json({error: "Product not found"});
        }    
    } catch (error) {
        res.json(error);
    }
});

export default router;