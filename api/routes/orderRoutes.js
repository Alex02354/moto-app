import express from "express";
const router = express.Router();
import { createOrder, getOrder } from "../database/orders.js";

router.get("/:reference", async (req, res) => {
  const order = await getOrder(req.params.reference);

  if (!order) {
    res.status(404).send({ status: "FAILED", error: "Order not found" });
    return;
  }

  res.send({ status: "OK", data: order });
});

// create order endpoint
router.post("/", async (req, res) => {
  const orderData = req.body;

  orderData.ref = (Math.random() + 1).toString(36).substring(7);

  const newOrder = await createOrder(orderData);

  res.status(201).send({ status: "OK", data: newOrder });
});

export default router;
