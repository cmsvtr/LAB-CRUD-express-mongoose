import express from "express";
import PurchaseModel from "../models/purchase.model.js";

const purchaseRoute = express.Router();

purchaseRoute.post("/purchases/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;

    const newPurchase = await PurchaseModel.create({
      ...req.body,
      album: albumId,
    });

    return res.status(201).json(newPurchase);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

purchaseRoute.get("/purchases/:purchaseId", async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await PurchaseModel.findById(purchaseId).populate("album");

    return res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default purchaseRoute;