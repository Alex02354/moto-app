import express from "express";
const router = express.Router();
import { getAllProducts, getProduct } from "../database/products.js";

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  /*   console.log(products); */
  res.send({ status: "OK", data: products });
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      res.status(404).send({ status: "FAILED", error: "Product not found" });
      return;
    }

    res.send({ status: "OK", data: product });
  } catch (e) {
    res.status(401).send({ status: "FAILED", error: e.message });
  }
});

export default router;
