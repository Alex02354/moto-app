import React, { useEffect } from "react";
import Events from "./Events";
import { useTranslation } from "react-i18next";

// Import images for both languages
import campsEn from "../assets/images/camps.png";
import campsSk from "../assets/images/kempy.png";
import naturalEn from "../assets/images/camps - natural.png";
import naturalSk from "../assets/images/kempy - prirodne.png";
import createdEn from "../assets/images/camps - created.png";
import createdSk from "../assets/images/kempy - umele.png";

const Camps = ({ section, subsection }) => {
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select images based on the language
  const campsImage = i18n.language === "sk" ? campsSk : campsEn;
  const naturalImage = i18n.language === "sk" ? naturalSk : naturalEn;
  const createdImage = i18n.language === "sk" ? createdSk : createdEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      {/* Camps Image */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={campsImage}
          alt={i18n.language === "sk" ? "Kempy" : "Camps"}
          className="w-full max-w-64 sm:max-w-xs md:max-w-sm lg:max-w-96 h-auto my-2 px-4 py-3"
        />
        {/* Divider */}
        <hr className="border-black border-t-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4" />
      </div>

      {/* Sub-Category Images */}
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <img
          src={naturalImage}
          alt={i18n.language === "sk" ? "Prírodné" : "Natural"}
          onClick={() => navigate("/events/camp/natural")}
          className="cursor-pointer w-full max-w-64 sm:max-w-xs md:max-w-sm lg:max-w-96 h-auto my-2 px-4 py-3"
        />
        <img
          src={createdImage}
          alt={i18n.language === "sk" ? "Umelé" : "Created"}
          onClick={() => navigate("/events/camp/created")}
          className="cursor-pointer w-full max-w-lg sm:max-w-lg md:max-w-2xl lg:max-w-2xl h-auto my-2 px-4 py-3"
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

export default Camps;
