import React, { useEffect } from "react";
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import images for both languages
import routesEn from "../assets/images/routes.png";
import routesSk from "../assets/images/trasy.png";
import caravanEn from "../assets/images/routes - caravan.png";
import caravanSk from "../assets/images/trasy - karavan.png";
import offroadEn from "../assets/images/routes - offroad.png";
import offroadSk from "../assets/images/trasy - offroad.png";

const Routes2 = ({ section, subsection }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the images based on the language
  const routesImage = routesSk;
  const caravanImage = caravanSk;
  const offroadImage = offroadSk;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      {/* Routes Image */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={routesImage}
          alt={i18n.language === "sk" ? "Trasy" : "Routes"}
          className="w-full max-w-72 sm:max-w-72 md:max-w-xs lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        {/* Divider */}
        <hr className="border-black border-t-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4" />
      </div>

      {/* Sub-Category Images */}
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <img
          src={caravanImage}
          alt={i18n.language === "sk" ? "Karavan" : "Caravan"}
          onClick={() => navigate("/events/route/caravan")}
          className="cursor-pointer w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl h-auto my-2 px-4 py-3"
        />
        <img
          src={offroadImage}
          alt={i18n.language === "sk" ? "Offroad" : "Offroad"}
          onClick={() => navigate("/events/route/offroad")}
          className="cursor-pointer w-full max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-md h-auto my-2 px-4 py-3"
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

export default Routes2;
