import express from "express";
const router = express.Router();
import {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../database/events.js";

router.get("/", async (req, res) => {
  const events = await getAllEvents();
  res.send({ status: "OK", data: events });
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await getEvent(req.params.eventId);

    if (!event) {
      res.status(404).send({ status: "FAILED", error: "Event not found" });
      return;
    }

    res.send({ status: "OK", data: event });
  } catch (e) {
    res.status(401).send({ status: "FAILED", error: e.message });
  }
});

router.post("/", async (req, res) => {
  const eventData = req.body;

  const newEvent = await createEvent(eventData);

  res.status(201).send({ status: "OK", data: newEvent });
});

// Delete event endpoint
router.delete("/:eventId", async (req, res) => {
  try {
    const deleteResult = await deleteEvent(req.params.eventId);

    if (!deleteResult) {
      res.status(404).send({ status: "FAILED", error: "Event not found" });
      return;
    }

    res.send({ status: "OK", message: "Event deleted successfully" });
  } catch (e) {
    res.status(500).send({ status: "FAILED", error: e.message });
  }
});

// Update event endpoint
router.put("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const eventData = req.body;

  try {
    const updatedEvent = await updateEvent(eventId, eventData);

    if (!updatedEvent) {
      res.status(404).send({ status: "FAILED", error: "Event not found" });
      return;
    }

    res.send({ status: "OK", data: updatedEvent });
  } catch (e) {
    res.status(500).send({ status: "FAILED", error: e.message });
  }
});

export default router;
