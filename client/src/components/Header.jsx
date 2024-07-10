import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import landscapeImage from "../assets/images/cover.jpg"; // Import the image

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-black">
      {/* Full-width Landscape Image */}
      <div className="w-full relative" style={{ paddingBottom: "26%" }}>
        <img
          src={landscapeImage}
          alt="Landscape"
          className="absolute top-0 left-0 w-full h-full object-fill"
        />
      </div>

      {/* Navigation Bar */}
      <div className="max-w-8xl p-4 text-yellow-400 text-xl font-bold">
        <div className="flex justify-between items-center">
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            className="lg:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          />
          <ul className="hidden lg:flex justify-evenly w-full">
            <Link to="/">
              <li className="hover:text-gray-400">
                <FontAwesomeIcon icon={faHome} />
              </li>
            </Link>
            <Link to="/events">
              <li className="hover:text-gray-400">
                OFF-ROAD EXPEDÍCIE a VÝJAZDY
              </li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-400">HLAVNÉ MESTÁ a INÉ</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-400">POZNÁVACIE CESTY</li>
            </Link>

            <Link to="/about">
              <li className="hover:text-gray-500">EXOTICKÉ CESTY</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-500">TRASY, TIPY a ITINERÁRE</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <li className="hover:text-gray-400">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden flex flex-col items-center mt-4 space-y-4">
            <Link to="/" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">
                <FontAwesomeIcon icon={faHome} />
              </li>
            </Link>
            <Link to="/events" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">
                OFF-ROAD EXPEDÍCIE a VÝJAZDY
              </li>
            </Link>
            <Link to="/about" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">HLAVNÉ MESTÁ a INÉ</li>
            </Link>
            <Link to="/about" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">POZNÁVACIE CESTY</li>
            </Link>

            <Link to="/about" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-500">EXOTICKÉ CESTY</li>
            </Link>
            <Link to="/about" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-500">TRASY, TIPY a ITINERÁRE</li>
            </Link>
            <Link to="/profile" onClick={toggleMobileMenu}>
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <li className="hover:text-gray-400">Sign In</li>
              )}
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}
