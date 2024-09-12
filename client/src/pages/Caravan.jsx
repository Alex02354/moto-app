import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import caravan from "../assets/images/routes - caravan.png";

const Caravan = ({ section, subsection }) => {
  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={caravan}
          alt="Caravan"
          className="w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Caravan;
