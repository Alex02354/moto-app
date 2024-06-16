// products.js
import { ObjectId } from "mongodb";
import getDB from "./db.js";

export const getAllProducts = async () => {
  return await getDB().products.find().toArray();
};

export const getProduct = async (id) => {
  return await getDB().products.findOne({ _id: new ObjectId(id) });
};
