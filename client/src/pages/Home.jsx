import React, { useState, useEffect } from "react";
import myImage from "../assets/images/3.jpg"; // Adjust the path as necessary
import myImage2 from "../assets/images/1.jpg";
import myImage3 from "../assets/images/2.jpg";
import Events from "./Events";
import { FaArrowUp } from "react-icons/fa"; // Import arrow up icon from react-icons
import mapa from "../assets/images/mapa-mensia.jpg";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // State for image expansion

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-10xl mx-auto mt-10">
      <div className="max-w-7xl items-center mx-auto">
        <Events />
        <h1 className="p-4 text-3xl font-bold  text-left">PLÁN JE JASNÝ ...</h1>
        <img
          src={mapa}
          alt="Home"
          className="cursor-pointer"
          onClick={() => setIsImageExpanded(true)}
        />
        {isImageExpanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setIsImageExpanded(false)}
          >
            <img
              src={mapa}
              alt="Enlarged map"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>

      <button
        className={`fixed bottom-5 right-10 p-4 rounded-full bg-yellow-500 text-white ${
          showScroll ? "block" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    </main>
  );
}
