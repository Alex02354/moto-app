import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import axios from "axios";
import { useSelector } from "react-redux";

const EditEvent = ({ event, onSubmitSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: event.title,
    description: event.description,
    image: event.image,
    map: event.map,
    coordinates: event.coordinates.join(","),
    access: event.access,
    date: event.date,
    section: event.section,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.user.currentUser); // Replace with the actual path to the user in your Redux state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/events/${event._id}`, {
        ...eventData,
        coordinates: eventData.coordinates.split(",").map(Number),
        user: { currentUser: user }, // Nested user structure
      });
      setModalOpen(false);
      onSubmitSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn btn-secondary">
        Edit Event
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h3 className="text-xl font-bold mb-4">Edit Event</h3>
          {error && <div className="text-red-500">{error}</div>}
          <div className="form-control">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Image URL</label>
            <input
              type="text"
              name="image"
              value={eventData.image}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Map URL</label>
            <input
              type="text"
              name="map"
              value={eventData.map}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Coordinates (comma-separated)</label>
            <input
              type="text"
              name="coordinates"
              value={eventData.coordinates}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Access Level</label>
            <input
              type="number"
              name="access"
              value={eventData.access}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Date</label>
            <input
              type="datetime-local"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Section</label>
            <input
              type="text"
              name="section"
              value={eventData.section}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

EditEvent.propTypes = {
  event: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default EditEvent;
