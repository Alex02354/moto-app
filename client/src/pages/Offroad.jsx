import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import offroad from "../assets/images/routes - offroad.png";

const Offroad = ({ section, subsection }) => {
  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={offroad}
          alt="Offroad"
          className="w-64 h-auto my-2 px-4 py-3"
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

export default Offroad;
