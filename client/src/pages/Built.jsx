import React, { useEffect } from "react";
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import images
import builtEn from "../assets/images/places - built.png";
import builtSk from "../assets/images/stavby.png";

const Built = ({ section, subsection }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the image based on the language
  const builtImage = i18n.language === "sk" ? builtSk : builtEn;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={builtImage}
          alt={i18n.language === "sk" ? "Stavby" : "Built"}
          className="w-full max-w-72 sm:max-w-xs md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
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

export default Built;
