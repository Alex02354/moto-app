import React, { useEffect } from "react";
import Events from "./Events";
import { useTranslation } from "react-i18next";

// Import images
import viewsEn from "../assets/images/places - views.png";
import viewsSk from "../assets/images/vyhlady.png";

const Views = ({ section, subsection }) => {
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select the image based on the language
  const viewsImage = viewsSk;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={viewsImage}
          alt={i18n.language === "sk" ? "Výhľady" : "Views"}
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

export default Views;
