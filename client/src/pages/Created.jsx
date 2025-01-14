import React, { useEffect } from "react";
import Events from "./Events";
import { useTranslation } from "react-i18next";

// Import images for both languages
import createdEn from "../assets/images/camps - created.png";
import createdSk from "../assets/images/kempy - umele.png";

const Created = ({ section, subsection }) => {
  const { i18n } = useTranslation();

  // Change language based on the browser's default language
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  // Select image based on the language
  const createdImage = createdSk;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={createdImage}
          alt={i18n.language === "sk" ? "Umelé" : "Created"}
          className="w-full max-w-lg sm:max-w-lg md:max-w-2xl lg:max-w-2xl h-auto my-2 px-4 py-3"
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

export default Created;
