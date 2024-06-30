import { MongoClient } from "mongodb";

const uri = process.env.MONGO2;

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
