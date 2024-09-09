import React from "react";
import Events from "./Events"; // Adjust the import path accordingly
import { useNavigate } from "react-router-dom";
import natural from "../assets/images/camps - natural.png";
import created from "../assets/images/camps - created.png";
import camps from "../assets/images/camps.png";

const Camps = ({ section, subsection }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-center">
        <img
          src={camps}
          alt="Camps"
          className="w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img
          src={natural}
          alt="Natural"
          onClick={() => navigate("/events/camp/natural")}
          className="cursor-pointer w-64 h-auto my-2 px-4 py-3"
          // Add custom styles as needed
        />

        <img
          src={created}
          alt="Created"
          onClick={() => navigate("/events/camp/created")}
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

export default Camps;
