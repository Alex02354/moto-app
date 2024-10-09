import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddEvent from "../components/AddEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaravan,
  faCarSide,
  faTruckMonster,
} from "@fortawesome/free-solid-svg-icons";
import countries from "../data/countries"; // Import the list of countries
import "../data/i18n";
import { useTranslation } from "react-i18next";

const Events = ({
  country,
  currentUserId,
  section,
  subsection,
  hideAddEvent,
  hideFilterButtons,
}) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  // Helper function to translate the country name
  const translateCountry = (countryName) => {
    // Use the 't' function from i18next to look up translations for the country name
    return t(`countries.${countryName}`, { defaultValue: countryName });
  };

  // Helper function to translate the main section
  const translateMainSection = (mainSection) => {
    return t(`sections.${mainSection}`, { defaultValue: mainSection });
  };

  // Helper function to translate the subsection based on the main section
  const translateSubSection = (mainSection, subSection) => {
    // Dynamically map subsection translations based on main section type
    const sectionType = `${mainSection}Sections`;
    return t(`${sectionType}.${subSection}`, { defaultValue: subSection });
  };

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSection, setSelectedSection] = useState("ALL"); // State for section buttons
  const [selectedCountry, setSelectedCountry] = useState("ALL"); // State for country dropdown

  const currentUser = useSelector((state) => state.user.currentUser);

  const { wishlistsItems } = useSelector((state) => state?.wishlists);

  console.log(wishlistsItems);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      let fetchedEvents = response.data.data;

      // Original filtering logic by currentUserId, section, and subsection
      if (currentUserId) {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.user && event.user.currentUser._id === currentUserId
        );
        console.log("Filtered Events by currentUserId:", fetchedEvents);
      }

      if (section && Array.isArray(section)) {
        fetchedEvents = fetchedEvents.filter((event) =>
          section.includes(event.section.main)
        );
      } else if (section) {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.section.main === section
        );
      }

      if (subsection && Array.isArray(subsection)) {
        fetchedEvents = fetchedEvents.filter((event) =>
          subsection.includes(event.section.sub)
        );
      } else if (subsection) {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.section.sub === subsection
        );
      }

      // Additional filtering based on the section buttons
      if (selectedSection !== "ALL") {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.section.main === selectedSection.toLowerCase()
        );
      }

      // Additional filtering based on the country dropdown
      if (selectedCountry !== "ALL") {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.country === selectedCountry
        );
      }

      setEvents(
        fetchedEvents.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [
    currentUserId,
    country,
    section,
    subsection,
    selectedSection,
    selectedCountry,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getAccessIcon = (access) => {
    const iconSize = "xl";
    switch (access) {
      case 0:
        return <FontAwesomeIcon icon={faCaravan} size={iconSize} />;
      case 1:
        return <FontAwesomeIcon icon={faCarSide} size={iconSize} />;
      default:
        return <FontAwesomeIcon icon={faTruckMonster} size={iconSize} />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="text-center my-5">
        {/* Conditionally render AddEvent if hideAddEvent is false and user is signed in */}
        {currentUser && currentUser._id && !hideAddEvent && (
          <AddEvent onSubmitSuccess={fetchEvents} />
        )}
        {(!currentUser || !currentUser._id) && <p>{t("signedin")}</p>}

        {/* Conditionally render Section Filtering Buttons */}
        {!hideFilterButtons && (
          <div className="my-4 flex flex-wrap justify-center">
            <button
              onClick={() => setSelectedSection("ALL")}
              className={`btn mx-2 my-1 px-4 py-2 text-sm md:text-base font-bold transition duration-300 ${
                selectedSection === "ALL"
                  ? "bg-black text-yellow-400 hover:bg-black"
                  : "bg-yellow-400 hover:bg-black hover:text-yellow-400"
              }`}
            >
              {t("all")}
            </button>
            <button
              onClick={() => setSelectedSection("route")}
              className={`btn mx-2 my-1 px-4 py-2 text-sm md:text-base font-bold transition duration-300 ${
                selectedSection === "route"
                  ? "bg-black text-yellow-400 hover:bg-black"
                  : "bg-yellow-400 hover:bg-black hover:text-yellow-400"
              }`}
            >
              {t("routes")}
            </button>
            <button
              onClick={() => setSelectedSection("camp")}
              className={`btn mx-2 my-1 px-4 py-2 text-sm md:text-base font-bold transition duration-300 ${
                selectedSection === "camp"
                  ? "bg-black text-yellow-400 hover:bg-black"
                  : "bg-yellow-400 hover:bg-black hover:text-yellow-400"
              }`}
            >
              {t("camps")}
            </button>
            <button
              onClick={() => setSelectedSection("places")}
              className={`btn mx-2 my-1 px-4 py-2 text-sm md:text-base font-bold transition duration-300 ${
                selectedSection === "places"
                  ? "bg-black text-yellow-400 hover:bg-black"
                  : "bg-yellow-400 hover:bg-black hover:text-yellow-400"
              }`}
            >
              {t("places2")}
            </button>
            <button
              onClick={() => setSelectedSection("itinerary")}
              className={`btn mx-2 my-1 px-4 py-2 text-sm md:text-base font-bold transition duration-300 ${
                selectedSection === "itinerary"
                  ? "bg-black text-yellow-400 hover:bg-black"
                  : "bg-yellow-400 hover:bg-black hover:text-yellow-400"
              }`}
            >
              {t("itinerary2")}
            </button>
          </div>
        )}

        {/* Country Filtering Dropdown */}
        <div className="my-4">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="p-2 border rounded"
          >
            {/* Default option for all countries */}
            <option value="ALL">{t("all_countries")}</option>

            {/* Map through the keys of the countries object in the translation */}
            {Object.keys(t("countries", { returnObjects: true })).map(
              (countryKey) => (
                <option key={countryKey} value={countryKey}>
                  {t(`countries.${countryKey}`)} {/* Translated country name */}
                </option>
              )
            )}
          </select>
        </div>

        {/* Event Listing */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {events && events.length > 0 ? (
            events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="card w-96 bg-base-100 shadow-xl hover:border-yellow-400 border-2 border-black transition duration-300"
              >
                <figure className="px-5 pt-5">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center">
                    {getAccessIcon(event.access)}
                  </div>
                  <h2 className="card-title text-lime-800 font-bold mt-0">
                    {event.title}
                  </h2>
                  <div className="text-left mt-0">
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-left mt-0">
                    <p>
                      <strong>{t("country")}:</strong>{" "}
                      {translateCountry(event.country)}
                    </p>
                    <p>
                      <strong>{t("section")}:</strong>{" "}
                      {translateMainSection(event.section.main)}{" "}
                      {translateSubSection(
                        event.section.main,
                        event.section.sub
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>{t("noevents")}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Events;
