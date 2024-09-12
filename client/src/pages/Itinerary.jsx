import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { useNavigate } from "react-router-dom";
import itineraries from "../assets/images/itineraries.png";

const Itinerary = ({ section, subsection }) => {
  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={itineraries}
          alt="Itinerary"
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Itinerary;
