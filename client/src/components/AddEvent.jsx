import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import "../data/i18n";
import { useTranslation } from "react-i18next";

// Import both images
import addImageEn from "../assets/images/ADD.png";
import addImageSk from "../assets/images/add2.png";
import discoverImageEn from "../assets/images/discover.png";
import discoverImageSk from "../assets/images/discover2.png";

const AddEvent = ({ onSubmitSuccess }) => {
  const { t, i18n } = useTranslation();

  // Set language based on browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Determine the correct image based on the current language
  const addEventImage = i18n.language === "sk" ? addImageSk : addImageEn;
  const discoverEventImage =
    i18n.language === "sk" ? discoverImageSk : discoverImageEn;

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

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError("File size must be less than 5 MB");
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
      setError(t("image_first"));
      return;
    }
    setIsSubmitting(true);

    try {
      const formattedCoordinates =
        (eventData.section.main === "itinerary" ||
          eventData.section.main === "route") &&
        !eventData.coordinates.trim()
          ? [] // Set coordinates to an empty array if no values entered and section is itinerary or route
          : eventData.coordinates.split(",").map(Number);

      await axios.post("/api/events", {
        ...eventData,
        access: parseInt(eventData.access, 10), // Ensure access is an integer
        coordinates: formattedCoordinates,
        user, // Include the user in the event data
      });

      setModalOpen(false);
      setEventData({
        title: "",
        description: "",
        image: "",
        map: "", // Reset map field after successful submission
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
      setError(t("coordinates_warning"));
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

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap">
        <img
          src={discoverEventImage}
          alt="Add New Event"
          onClick={() => navigate("/events/section")}
          className="cursor-pointer w-full max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-md h-auto my-2 px-4 py-3"
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
          <h3 className="text-xl font-bold mb-4">{t("add_new_event")}</h3>

          <div className="form-control">
            <label className="label">{t("main_section")}</label>
            <select
              name="sectionMain"
              value={eventData.section.main}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">{t("select_main_section")}</option>
              <option value="camp">{t("camp")}</option>
              <option value="route">{t("route")}</option>
              <option value="itinerary">{t("itinerary")}</option>
              <option value="places">{t("places")}</option>
            </select>
          </div>
          {/* Conditionally render the sub-section select based on the main section */}
          {eventData.section.main === "camp" && (
            <div className="form-control">
              <label className="label">{t("camp_subsection")}</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">{t("select_sub_section")}</option>
                <option value="natural">{t("natural")}</option>
                <option value="created">{t("created")}</option>
              </select>
            </div>
          )}

          {eventData.section.main === "route" && (
            <div className="form-control">
              <label className="label">{t("route_subsection")}</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">{t("select_sub_section")}</option>
                <option value="offroad">{t("offroad")}</option>
                <option value="caravan_car">{t("caravan_car")}</option>
              </select>
            </div>
          )}

          {eventData.section.main === "places" && (
            <div className="form-control">
              <label className="label">{t("places_subsection")}</label>
              <select
                name="sectionSub"
                value={eventData.section.sub}
                onChange={(e) => handleSubSectionChange(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="">{t("select_sub_section")}</option>
                <option value="nature">{t("nature")}</option>
                <option value="built">{t("built")}</option>
                <option value="views">{t("views")}</option>
              </select>
            </div>
          )}
          <div className="form-control">
            <label className="label">{t("country")}</label>
            <select
              name="country"
              value={eventData.country}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="">{t("select_country")}</option>
              <option value="Afghanistan">{t("countries.Afghanistan")}</option>
              <option value="Albania">{t("countries.Albania")}</option>
              <option value="Algeria">{t("countries.Algeria")}</option>
              <option value="Andorra">{t("countries.Andorra")}</option>
              <option value="Argentina">{t("countries.Argentina")}</option>
              <option value="Armenia">{t("countries.Armenia")}</option>
              <option value="Australia">{t("countries.Australia")}</option>
              <option value="Azerbaijan">{t("countries.Azerbaijan")}</option>
              <option value="Belarus">{t("countries.Belarus")}</option>
              <option value="Belgium">{t("countries.Belgium")}</option>
              <option value="Bolivia">{t("countries.Bolivia")}</option>
              <option value="Bosnia_Herzegovina">
                {t("countries.Bosnia_Herzegovina")}
              </option>
              <option value="Brazil">{t("countries.Brazil")}</option>
              <option value="Bulgaria">{t("countries.Bulgaria")}</option>
              <option value="Croatia">{t("countries.Croatia")}</option>
              <option value="Cyprus">{t("countries.Cyprus")}</option>
              <option value="Czechia">{t("countries.Czechia")}</option>
              <option value="Montenegro">{t("countries.Montenegro")}</option>
              <option value="China">{t("countries.China")}</option>
              <option value="Denmark">{t("countries.Denmark")}</option>
              <option value="Egypt">{t("countries.Egypt")}</option>
              <option value="Estonia">{t("countries.Estonia")}</option>
              <option value="Finland">{t("countries.Finland")}</option>
              <option value="France">{t("countries.France")}</option>
              <option value="Greece">{t("countries.Greece")}</option>
              <option value="Georgia">{t("countries.Georgia")}</option>
              <option value="Netherlands">{t("countries.Netherlands")}</option>
              <option value="India">{t("countries.India")}</option>
              <option value="Indonesia">{t("countries.Indonesia")}</option>
              <option value="Iraq">{t("countries.Iraq")}</option>
              <option value="Iran">{t("countries.Iran")}</option>
              <option value="Iceland">{t("countries.Iceland")}</option>
              <option value="Ireland">{t("countries.Ireland")}</option>
              <option value="Israel">{t("countries.Israel")}</option>
              <option value="Japan">{t("countries.Japan")}</option>
              <option value="Yemen">{t("countries.Yemen")}</option>
              <option value="Jordan">{t("countries.Jordan")}</option>
              <option value="Canada">{t("countries.Canada")}</option>
              <option value="Kazakhstan">{t("countries.Kazakhstan")}</option>
              <option value="Kyrgyzstan">{t("countries.Kyrgyzstan")}</option>
              <option value="Colombia">{t("countries.Colombia")}</option>
              <option value="Kosovo">{t("countries.Kosovo")}</option>
              <option value="Lebanon">{t("countries.Lebanon")}</option>
              <option value="Libya">{t("countries.Libya")}</option>
              <option value="Liechtenstein">
                {t("countries.Liechtenstein")}
              </option>
              <option value="Lithuania">{t("countries.Lithuania")}</option>
              <option value="Latvia">{t("countries.Latvia")}</option>
              <option value="Luxembourg">{t("countries.Luxembourg")}</option>
              <option value="Hungary">{t("countries.Hungary")}</option>
              <option value="Malta">{t("countries.Malta")}</option>
              <option value="Morocco">{t("countries.Morocco")}</option>
              <option value="Mexico">{t("countries.Mexico")}</option>
              <option value="Moldova">{t("countries.Moldova")}</option>
              <option value="Monaco">{t("countries.Monaco")}</option>
              <option value="Mongolia">{t("countries.Mongolia")}</option>
              <option value="Germany">{t("countries.Germany")}</option>
              <option value="Norway">{t("countries.Norway")}</option>
              <option value="New_Zealand">{t("countries.New_Zealand")}</option>
              <option value="Oman">{t("countries.Oman")}</option>
              <option value="Pakistan">{t("countries.Pakistan")}</option>
              <option value="Peru">{t("countries.Peru")}</option>
              <option value="Poland">{t("countries.Poland")}</option>
              <option value="Portugal">{t("countries.Portugal")}</option>
              <option value="Austria">{t("countries.Austria")}</option>
              <option value="Romania">{t("countries.Romania")}</option>
              <option value="Russia">{t("countries.Russia")}</option>
              <option value="San_Marino">{t("countries.San_Marino")}</option>
              <option value="Saudi_Arabia">
                {t("countries.Saudi_Arabia")}
              </option>
              <option value="North Macedonia">
                {t("countries.North_Macedonia")}
              </option>
              <option value="Slovakia">{t("countries.Slovakia")}</option>
              <option value="Slovenia">{t("countries.Slovenia")}</option>
              <option value="United_Arab_Emirates">
                {t("countries.United_Arab_Emirates")}
              </option>
              <option value="United_Kingdom">
                {t("countries.United_Kingdom")}
              </option>
              <option value="United_States_of_America">
                {t("countries.United_States_of_America")}
              </option>
              <option value="Serbia">{t("countries.Serbia")}</option>
              <option value="Spain">{t("countries.Spain")}</option>
              <option value="Sweden">{t("countries.Sweden")}</option>
              <option value="Switzerland">{t("countries.Switzerland")}</option>
              <option value="Syria">{t("countries.Syria")}</option>
              <option value="Italy">{t("countries.Italy")}</option>
              <option value="Tajikistan">{t("countries.Tajikistan")}</option>
              <option value="Thailand">{t("countries.Thailand")}</option>
              <option value="Tunisia">{t("countries.Tunisia")}</option>
              <option value="Turkey">{t("countries.Turkey")}</option>
              <option value="Turkmenistan">
                {t("countries.Turkmenistan")}
              </option>
              <option value="Uzbekistan">{t("countries.Uzbekistan")}</option>
              <option value="Venezuela">{t("countries.Venezuela")}</option>
              <option value="Vietnam">{t("countries.Vietnam")}</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">{t("title")}</label>
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
            <label className="label">{t("description")}</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">{t("image")}</label>
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
              {uploadingImage ? t("uploading") : t("upload_image")}
            </button>
            {uploadingImage && <div>{`Uploading: ${imagePercent}%`}</div>}
            {imageUploadError && (
              <div className="text-red-500">
                Error uploading image: {imageUploadError}
              </div>
            )}
            {imageUploaded && (
              <div className="text-green-700">{t("image_success")}</div>
            )}
          </div>
          <div className="form-control">
            <label className="label">{t("map_itinerary")}</label>
            <input
              type="text"
              name="map"
              value={eventData.map}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              {t("coordinates")} ({t("comma")})
            </label>
            <input
              type="text"
              name="coordinates"
              value={eventData.coordinates}
              onBlur={handleBlur}
              onChange={(e) =>
                setEventData({ ...eventData, coordinates: e.target.value })
              }
              placeholder={t("example")}
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
            <label className="label">{t("access")}</label>
            <select
              name="access"
              value={eventData.access}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="">{t("select_access")}</option>
              <option value={0}>{t("caravan")}</option>
              <option value={1}>{t("car")}</option>
              <option value={2}>{t("offroad")}</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">{t("date")}</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="input input-bordered"
              max={today} // Restrict future dates
              required
            />
          </div>

          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 my-2 px-4 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("loading") : t("submit")}
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
