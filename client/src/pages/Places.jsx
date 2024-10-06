import React, { useEffect } from "react";
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import images
import placesEn from "../assets/images/places.png";
import placesSk from "../assets/images/miesta.png";
import naturalEn from "../assets/images/places - natural.png";
import naturalSk from "../assets/images/priroda.png";
import builtEn from "../assets/images/places - built.png";
import builtSk from "../assets/images/stavby.png";
import viewsEn from "../assets/images/places - views.png";
import viewsSk from "../assets/images/vyhlady.png";

const Places = ({ section, subsection }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select images based on the current language
  const placesImage = i18n.language === "sk" ? placesSk : placesEn;
  const naturalImage = i18n.language === "sk" ? naturalSk : naturalEn;
  const builtImage = i18n.language === "sk" ? builtSk : builtEn;
  const viewsImage = i18n.language === "sk" ? viewsSk : viewsEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      {/* Places Image */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={placesImage}
          alt={i18n.language === "sk" ? "Miesta" : "Places"}
          className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md h-auto my-2 px-4 py-3"
        />
        {/* Divider */}
        <hr className="border-black border-t-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4" />
      </div>

      {/* Sub-Category Images */}
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <img
          src={naturalImage}
          alt={i18n.language === "sk" ? "Príroda" : "Nature"}
          onClick={() => navigate("/events/places/nature")}
          className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={builtImage}
          alt={i18n.language === "sk" ? "Stavby" : "Built"}
          onClick={() => navigate("/events/places/built")}
          className="cursor-pointer w-full max-w-64 sm:max-w-xs md:max-w-xs lg:max-w-xs h-auto my-2 px-4 py-3"
        />
        <img
          src={viewsImage}
          alt={i18n.language === "sk" ? "Výhľady" : "Views"}
          onClick={() => navigate("/events/places/views")}
          className="cursor-pointer w-full max-w-64 sm:max-w-xs md:max-w-xs lg:max-w-xs h-auto my-2 px-4 py-3"
        />
      </div>

      {/* Events Section */}
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

export default Places;
