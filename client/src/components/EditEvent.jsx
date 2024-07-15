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
    access: event.access.toString(), // Convert access to string initially
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
      await axios.put(`/api/events/${event._id}`, {
        ...eventData,
        access: parseInt(eventData.access, 10), // Ensure access is an integer
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
      <button
        onClick={() => setModalOpen(true)}
        className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg"
      >
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
            <select
              name="access"
              value={eventData.access}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="0">Caravan</option>
              <option value="1">Car</option>
              <option value="2">Offroad</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">Date</label>
            <input
              type="date" // Change input type to "date" to restrict time selection
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Section</label>
            <select
              name="section"
              value={eventData.section}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="kemp">Kemp</option>
              <option value="places">Places</option>
              <option value="itinerary">Itinerary</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 my-2 px-4 rounded-lg"
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
