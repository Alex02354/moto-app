import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ modalOpen, setModalOpen, children }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (modalOpen) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
      }
    };

    handleScroll(); // Initial call

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
