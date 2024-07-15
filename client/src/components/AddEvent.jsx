import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase"; // Adjust the path as necessary

const AddEvent = ({ onSubmitSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    map: "",
    coordinates: "",
    access: "",
    date: "",
    section: "",
    country: "", // Add country to the state
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [mapUploadError, setMapUploadError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingMap, setUploadingMap] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [mapPercent, setMapPercent] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [mapUploaded, setMapUploaded] = useState(false);
  const imageFileRef = useRef(null);
  const mapFileRef = useRef(null);

  const user = useSelector((state) => state.user); // Replace with the actual path to the user in your Redux state

  const handleFileUpload = useCallback(async (fileRef, type) => {
    const file = fileRef.current.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      if (type === "image") {
        setImageUploadError("File size must be less than 2 MB");
      } else {
        setMapUploadError("File size must be less than 2 MB");
      }
      return;
    }

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    if (type === "image") setUploadingImage(true);
    else setUploadingMap(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (type === "image") setImagePercent(Math.round(progress));
        else setMapPercent(Math.round(progress));
      },
      (error) => {
        if (type === "image") {
          setImageUploadError(true);
          setUploadingImage(false);
        } else {
          setMapUploadError(true);
          setUploadingMap(false);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type === "image") {
            setEventData((prevEventData) => ({
              ...prevEventData,
              image: downloadURL,
            }));
            setUploadingImage(false);
            setImageUploadError(false);
            setImageUploaded(true);
          } else {
            setEventData((prevEventData) => ({
              ...prevEventData,
              map: downloadURL,
            }));
            setUploadingMap(false);
            setMapUploadError(false);
            setMapUploaded(true);
          }
        });
      }
    );
  }, []);

  const handleImageUpload = () => handleFileUpload(imageFileRef, "image");
  const handleMapUpload = () => handleFileUpload(mapFileRef, "map");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUploaded || !mapUploaded) {
      setError("Please upload the image and the map first.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("/api/events", {
        ...eventData,
        access: parseInt(eventData.access, 10), // Ensure access is an integer
        coordinates: eventData.coordinates.split(",").map(Number),
        user, // Include the user in the event data
      });
      setModalOpen(false);
      setEventData({
        title: "",
        description: "",
        image: "",
        map: "",
        coordinates: "",
        access: "",
        date: "",
        section: "",
        country: "", // Reset country field
      }); // Clear form data
      setImageUploaded(false); // Reset image upload status
      setMapUploaded(false); // Reset map upload status
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
        className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-3 my-2 px-4 rounded-lg"
      >
        Add New Event
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h3 className="text-xl font-bold mb-4">Add New Event</h3>
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
            <label className="label">Image</label>
            <input
              type="file"
              ref={imageFileRef}
              accept="image/*"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-3 my-2 px-4 rounded-lg"
              onClick={handleImageUpload}
              disabled={uploadingImage}
            >
              {uploadingImage ? "Uploading..." : "Upload Image"}
            </button>
            {uploadingImage && <div>{`Uploading: ${imagePercent}%`}</div>}
            {imageUploadError && (
              <div className="text-red-500">
                Error uploading image: {imageUploadError}
              </div>
            )}
            {imageUploaded && (
              <div className="text-green-700">Image uploaded successfully</div>
            )}
          </div>
          <div className="form-control">
            <label className="label">Map</label>
            <input
              type="file"
              ref={mapFileRef}
              accept="image/*"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-3 my-2 px-4 rounded-lg"
              onClick={handleMapUpload}
              disabled={uploadingMap}
            >
              {uploadingMap ? "Uploading..." : "Upload Map"}
            </button>
            {uploadingMap && <div>{`Uploading: ${mapPercent}%`}</div>}
            {mapUploadError && (
              <div className="text-red-500">
                Error uploading map: {mapUploadError}
              </div>
            )}
            {mapUploaded && (
              <div className="text-green-700">Map uploaded successfully</div>
            )}
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
              <option value="">Select an access</option>
              <option value={0}>Caravan</option>
              <option value={1}>Car</option>
              <option value={2}>Offroad</option>
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
              <option value="">Select a section</option>
              <option value="kemp">Kemp</option>
              <option value="places">Places</option>
              <option value="itinerary">Itinerary</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">Country</label>
            <select
              name="country"
              value={eventData.country}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="">Select a country</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Italy">Italy</option>
              <option value="France">France</option>
              <option value="Czech Republic">Czech Republic</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 my-2 px-4 rounded-lg"
            disabled={isSubmitting || uploadingImage || uploadingMap}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

AddEvent.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddEvent;
