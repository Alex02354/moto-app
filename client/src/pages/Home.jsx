import React, { useState, useEffect } from "react";

import Events from "./Events";
import { FaArrowUp } from "react-icons/fa"; // Import arrow up icon from react-icons

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
