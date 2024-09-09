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
      {/* Camps Image */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={camps}
          alt="Camps"
          className="w-full max-w-xs sm:max-w-xs md:max-w-md lg:max-w-lg h-auto my-2 px-4 py-3"
        />
        {/* Divider */}
        <hr className="border-black border-t-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4" />
      </div>

      {/* Sub-Category Images */}
      <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
        <img
          src={natural}
          alt="Natural"
          onClick={() => navigate("/events/camp/natural")}
          className="cursor-pointer w-full max-w-xs sm:max-w-xs md:max-w-md lg:max-w-lg h-auto my-2 px-4 py-3"
        />
        <img
          src={created}
          alt="Created"
          onClick={() => navigate("/events/camp/created")}
          className="cursor-pointer w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto my-2 px-4 py-3"
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

export default Camps;
