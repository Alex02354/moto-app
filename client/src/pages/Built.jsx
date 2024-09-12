import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { useNavigate } from "react-router-dom";
import built from "../assets/images/places - built.png";

const Built = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={built}
          alt="Built"
          className="w-full max-w-72 sm:max-w-xs md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
          // Add custom styles as needed
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
