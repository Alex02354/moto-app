import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

let client;

const getDB = () => {
  if (!client) {
    console.log("Creating a new client!");
    client = new MongoClient(uri);
  } else {
    console.log("Reusing the old client");
  }

  const database = client.db("test");
  const events = database.collection("events");

  return {
    events,
  };
};

export default getDB;
