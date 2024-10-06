import React, { useEffect } from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { useTranslation } from "react-i18next";

// Import images for both languages
import itinerariesEn from "../assets/images/itineraries.png";
import itinerariesSk from "../assets/images/itinerar.png";

const Itinerary = ({ section, subsection }) => {
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the image based on the language
  const itineraryImage = i18n.language === "sk" ? itinerariesSk : itinerariesEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={itineraryImage}
          alt={i18n.language === "sk" ? "Itinerár" : "Itinerary"}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Itinerary;
