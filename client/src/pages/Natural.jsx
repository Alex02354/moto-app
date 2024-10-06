import React, { useEffect } from "react";
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import images
import naturalEn from "../assets/images/places - natural.png";
import naturalSk from "../assets/images/priroda.png";

const Natural = ({ section, subsection }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the image based on the language
  const naturalImage = i18n.language === "sk" ? naturalSk : naturalEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={naturalImage}
          alt={i18n.language === "sk" ? "Príroda" : "Nature"}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto my-2 px-4 py-3"
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

export default Natural;
