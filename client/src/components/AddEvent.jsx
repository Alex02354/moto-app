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
import addEventImage from "../assets/images/ADD.png";
import discoverImage from "../assets/images/discover.png";
import { useNavigate } from "react-router-dom";

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
    section: { main: "", sub: "" },
    country: "", // Add country to the state
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const imageFileRef = useRef(null);

  const user = useSelector((state) => state.user); // Replace with the actual path to the user in your Redux state

  const navigate = useNavigate();

  const handleFileUpload = useCallback(async (fileRef, type) => {
    const file = fileRef.current.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setImageUploadError("File size must be less than 2 MB");
      return;
    }

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploadingImage(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
        setUploadingImage(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setEventData((prevEventData) => ({
            ...prevEventData,
            image: downloadURL,
          }));
          setUploadingImage(false);
          setImageUploadError(false);
          setImageUploaded(true);
        });
      }
    );
  }, []);

  const handleImageUpload = () => handleFileUpload(imageFileRef, "image");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUploaded) {
      setError("Please upload the image first.");
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
        section: { main: "camp", sub: "natural" },
        country: "",
      });
      setImageUploaded(false); // Reset image upload status
      onSubmitSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Coordinates regex validation
  const validateCoordinates = (input) => {
    const regex = /^\d{2}\.\d{0,6},\s?\d{2}\.\d{0,6}$/;
    return regex.test(input);
  };

  const handleBlur = () => {
    // Remove error if the coordinates field is empty or only contains spaces
    if (!eventData.coordinates.trim()) {
      setError(null); // Clear error
      return;
    }

    // Validate the format of the coordinates if not empty
    if (!validateCoordinates(eventData.coordinates)) {
      setError("Invalid coordinates format. Use XX.XXXXXX, YY.YYYYYY.");
    } else {
      setError(null);
    }
  };

  // Section main and sub logic
  const handleSectionChange = (mainSection) => {
    setEventData((prevData) => ({
      ...prevData,
      section: { ...prevData.section, main: mainSection, sub: "" },
      coordinates:
        mainSection === "route" || mainSection === "itinerary"
          ? ""
          : prevData.coordinates, // Clear coordinates if route or itinerary
    }));
  };

  const handleSubSectionChange = (subSection) => {
    setEventData((prevData) => ({
      ...prevData,
      section: { ...prevData.section, sub: subSection },
    }));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap">
        <img
          src={discoverImage}
          alt="Add New Event"
          onClick={() => navigate("/events/section")}
          className="cursor-pointer w-full max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-lg h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
        <img
          src={addEventImage}
          alt="Add New Event"
          onClick={() => setModalOpen(true)}
          className="cursor-pointer w-full max-w-72 sm:max-w-xs md:max-w-xs lg:max-w-md h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h3 className="text-xl font-bold mb-4">Add New Event</h3>

          <div className="form-control">
            <label className="label">Main Section</label>
            <select
              name="sectionMain"
              value={eventData.section.main}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">Select a main section</option>
              <option value="camp">Camp</option>
              <option value="route">Route</option>
              <option value="itinerary">Itinerary</option>
              <option value="places">Places</option>
            </select>
          </div>
          {/* Conditionally render the sub-section select based on the main section */}
          {eventData.section.main === "camp" && (
            <div className="form-control">
              <label className="label">Camp Sub-section</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">Select a sub-section</option>
                <option value="natural">Natural</option>
                <option value="created">Created</option>
              </select>
            </div>
          )}

          {eventData.section.main === "route" && (
            <div className="form-control">
              <label className="label">Route Sub-section</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">Select a sub-section</option>
                <option value="offroad">Offroad</option>
                <option value="caravan/car">Caravan/Car</option>
              </select>
            </div>
          )}

          {eventData.section.main === "places" && (
            <div className="form-control">
              <label className="label">Places Sub-section</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">Select a sub-section</option>
                <option value="nature">Nature</option>
                <option value="built">Built</option>
                <option value="views">Views</option>
              </select>
            </div>
          )}
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
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia_Herzegovina">Bosnia_Herzegovina</option>
              <option value="Brazil">Brazil</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Croatia">Croatia</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czechia">Czechia</option>
              <option value="Denmark">Denmark</option>
              <option value="Egypt">Egypt</option>
              <option value="Estonia">Estonia</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Greece">Greece</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Malta">Malta</option>
              <option value="Mexico">Mexico</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New_Zealand">New Zealand</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Peru">Peru</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="San_Marino">San Marino</option>
              <option value="Saudi_Arabia">Saudi Arabia</option>
              <option value="Serbia">Serbia</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Spain">Spain</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Thailand">Thailand</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="United_Arab_Emirates">United Arab Emirates</option>
              <option value="United_Kingdom">United Kingdom</option>
              <option value="United_States_of_America">
                United States of America
              </option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
            </select>
          </div>
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
            <label className="label">MAP/ITINERARY URL</label>
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
              onBlur={handleBlur}
              onChange={(e) =>
                setEventData({ ...eventData, coordinates: e.target.value })
              }
              placeholder="example 48.148598, 17.107748"
              className="input input-bordered"
              required
              // Disable the coordinates field if section.main is 'route' or 'itinerary'
              disabled={
                eventData.section.main === "route" ||
                eventData.section.main === "itinerary"
              }
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}
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

AddEvent.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddEvent;
