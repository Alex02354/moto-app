import { ObjectId } from "mongodb";
import getDB from "./db.js";

export const getAllEvents = async () => {
  return await getDB().events.find().toArray();
};

export const getEvent = async (id) => {
  return await getDB().events.findOne({ _id: new ObjectId(id) });
};

export const createEvent = async (event) => {
  const result = await getDB().events.insertOne(event);
  return { ...event, _id: result.insertedId };
};

export const deleteEvent = async (id) => {
  const result = await getDB().events.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

export const updateEvent = async (id, event) => {
  const result = await getDB().events.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: event },
    { returnDocument: "after" }
  );
  return result.value;
};
