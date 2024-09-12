import React from "react";
import Events from "./Events";
import { useNavigate } from "react-router-dom";
import places from "../assets/images/places.png";
import nature from "../assets/images/places - natural.png";
import built from "../assets/images/places - built.png";
import views from "../assets/images/places - views.png";

const Places = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      {/* Places Image */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={places}
          alt="Places"
          className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md h-auto my-2 px-4 py-3"
        />
        {/* Divider */}
        <hr className="border-black border-t-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4" />
      </div>

      {/* Sub-Category Images */}
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <img
          src={nature}
          alt="Nature"
          onClick={() => navigate("/events/places/nature")}
          className="cursor-pointer  w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm h-auto my-2 px-4 py-3"
        />
        <img
          src={built}
          alt="Built"
          onClick={() => navigate("/events/places/built")}
          className="cursor-pointer w-full max-w-72 sm:max-w-xs md:max-w-xs lg:max-w-xs h-auto my-2 px-4 py-3"
        />
        <img
          src={views}
          alt="Views"
          onClick={() => navigate("/events/places/views")}
          className="cursor-pointer w-full max-w-72 sm:max-w-xs md:max-w-xs lg:max-w-xs h-auto my-2 px-4 py-3"
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

export default Places;
