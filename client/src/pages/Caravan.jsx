import React, { useEffect } from "react";
import Events from "./Events";
import { useTranslation } from "react-i18next";

// Import images for both languages
import caravanEn from "../assets/images/routes - caravan.png";
import caravanSk from "../assets/images/trasy - karavan.png";

const Caravan = ({ section, subsection }) => {
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the image based on the language
  const caravanImage = i18n.language === "sk" ? caravanSk : caravanEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={caravanImage}
          alt={i18n.language === "sk" ? "Karavan" : "Caravan"}
          className="w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Caravan;
