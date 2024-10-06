import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import axios from "axios";
import "../data/i18n";
import { useTranslation } from "react-i18next";

const DeleteEvent = ({ eventId, onDeleteSuccess }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
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
        {t("delete_event")}
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">{t("delete_event")}</h3>
          {error && <div className="text-red-500">{error}</div>}
          <p>{t("delete_warning")}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="btn bg-yellow-400 hover:bg-yellow-600 text-black"
              disabled={isDeleting}
            >
              {isDeleting ? "..." : t("yes")}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="btn bg-danger"
            >
              {t("no")}
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
