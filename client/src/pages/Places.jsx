import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { Link, useNavigate } from "react-router-dom";
import places from "../assets/images/places.png";
import nature from "../assets/images/places - natural.png";
import built from "../assets/images/places - built.png";
import views from "../assets/images/places - views.png";

const Places = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={places}
          alt="Nature"
          className="w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img
          src={nature}
          alt="Nature"
          onClick={() => navigate("/events/places/nature")}
          className="cursor-pointer w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />

        <img
          src={built}
          alt="built"
          onClick={() => navigate("/events/places/built")}
          className="cursor-pointer w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
        <img
          src={views}
          alt="views"
          onClick={() => navigate("/events/places/views")}
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

export default Places;
