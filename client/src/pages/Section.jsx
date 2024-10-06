import React, { useEffect } from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import English and Slovak images
import placesEn from "../assets/images/places.png";
import placesSk from "../assets/images/miesta.png";
import routesEn from "../assets/images/routes.png";
import routesSk from "../assets/images/trasy.png";
import campsEn from "../assets/images/camps.png";
import campsSk from "../assets/images/kempy.png";
import itinerariesEn from "../assets/images/itineraries.png";
import itinerariesSk from "../assets/images/itinerar.png";

const Section = ({ section, subsection }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Change language based on browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select images based on the current language
  const placesImage = i18n.language === "sk" ? placesSk : placesEn;
  const routesImage = i18n.language === "sk" ? routesSk : routesEn;
  const campsImage = i18n.language === "sk" ? campsSk : campsEn;
  const itinerariesImage =
    i18n.language === "sk" ? itinerariesSk : itinerariesEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <Link to="/events/places">
          <img
            src={placesImage}
            alt={i18n.language === "sk" ? "Miesta" : "Places"}
            onClick={() => navigate("/events/places")}
            className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto my-2 px-4 py-3"
          />
        </Link>
        <img
          src={routesImage}
          alt={i18n.language === "sk" ? "Trasy" : "Routes"}
          onClick={() => navigate("/events/route")}
          className="cursor-pointer w-full max-w-72 sm:max-w-sm md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={campsImage}
          alt={i18n.language === "sk" ? "Kempy" : "Camps"}
          onClick={() => navigate("/events/camp")}
          className="cursor-pointer w-full max-w-72 sm:max-w-sm md:max-w-md lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={itinerariesImage}
          alt={i18n.language === "sk" ? "Itinerár" : "Itineraries"}
          onClick={() => navigate("/events/itinerary")}
          className="cursor-pointer w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl h-auto my-2 px-4 py-3"
        />
      </div>
      <div className="text-center my-5">
        <Events
          section={section}
          subsection={subsection}
          hideAddEvent={true}
          hideFilterButtons={true}
        />
      </div>
    </main>
  );
};

export default Section;
