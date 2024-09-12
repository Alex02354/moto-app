import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { Link, useNavigate } from "react-router-dom";
import places from "../assets/images/places.png";
import routes from "../assets/images/routes.png";
import itineraries from "../assets/images/itineraries.png";
import camps from "../assets/images/camps.png";

const Section = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <Link to="/events/places">
          <img
            src={places}
            alt="Places"
            onClick={() => navigate("/events/places")}
            className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto my-2 px-4 py-3"
          />
        </Link>
        <img
          src={routes}
          alt="route"
          onClick={() => navigate("/events/route")}
          className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={camps}
          alt="camp"
          onClick={() => navigate("/events/camp")}
          className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={itineraries}
          alt="Itineraries"
          onClick={() => navigate("/events/itinerary")}
          className="cursor-pointer w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Section;
