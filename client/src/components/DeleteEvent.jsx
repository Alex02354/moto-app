import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import axios from "axios";

const DeleteEvent = ({ eventId, onDeleteSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/events/${eventId}`);
      onDeleteSuccess();
      setModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-outline btn-neutral"
      >
        Delete Event
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Delete Event</h3>
          {error && <div className="text-red-500">{error}</div>}
          <p>Are you sure you want to delete this event?</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

DeleteEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteEvent;
