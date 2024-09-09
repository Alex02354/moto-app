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
            className="md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          />
          <ul className="hidden md:flex justify-evenly w-full">
            <Link to="/">
              <li className="hover:text-gray-400">
                <FontAwesomeIcon icon={faHome} />
              </li>
            </Link>

            <Link to="/country">
              <li className="hover:text-gray-400">Events by country</li>
            </Link>
            <Link to="/my-events">
              <li className="hover:text-gray-400">My Events</li>
            </Link>
            <Link to="/wishlist">
              <li className="hover:text-gray-400">Wishlist</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-400">About</li>
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

            <Link to="/country" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">Events by country</li>
            </Link>
            <Link to="/my-events" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">My Events</li>
            </Link>
            <Link to="/favourites" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-400">Favourites</li>
            </Link>
            <Link to="/about" onClick={toggleMobileMenu}>
              <li className="hover:text-gray-500">About</li>
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
