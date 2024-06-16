import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://aabrahamek:EFZ1U7pi0upr82go@moto-app.cvsxjkv.mongodb.net/";

let client;

const getDB = () => {
  if (!client) {
    console.log("Creating a new client!");
    client = new MongoClient(uri);
  } else {
    console.log("Reusing the old client");
  }

  const database = client.db("test");
  const products = database.collection("products");
  const orders = database.collection("orders");

  return {
    products,
    orders,
  };
};

export default getDB;
