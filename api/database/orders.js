import getDB from "./db.js";

export const getOrder = async (ref) => {
  return await getDB().orders.findOne({ ref });
};

export const createOrder = async (order) => {
  const result = await getDB().orders.insertOne(order);
  return { ...order, _id: result.insertedId };
};
