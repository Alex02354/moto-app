import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { useNavigate } from "react-router-dom";
import caravan from "../assets/images/routes - caravan.png";
import offroad from "../assets/images/routes - offroad.png";
import routes from "../assets/images/routes.png";

const Routes2 = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={routes}
          alt="Routes"
          className="w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img
          src={caravan}
          alt="Caravan"
          onClick={() => navigate("/events/route/caravan")}
          className="cursor-pointer w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />

        <img
          src={offroad}
          alt="offroad"
          onClick={() => navigate("/events/route/offroad")}
          className="cursor-pointer w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
      </div>
      <div className="text-center my-5">
        <Events section={section} subsection={subsection} hideAddEvent={true} />
      </div>
    </main>
  );
};

export default Routes2;
