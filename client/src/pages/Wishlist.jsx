import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import countries from "../data/countries"; // Import the list of countries
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedCountry, setSelectedCountry] = useState("ALL"); // State for country dropdown

  useEffect(() => {
    // If no user is signed in, show a message and stop loading
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/api/wishlist/${currentUser._id}`);
        const wishlistData = response.data;
        if (Array.isArray(wishlistData)) {
          setWishlist(wishlistData);
        } else {
          console.error("Unexpected wishlist data format:", wishlistData);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  const filteredWishlist =
    selectedCountry === "ALL"
      ? wishlist
      : wishlist.filter((item) => item.country === selectedCountry);

  const renderItem = (item) => (
    <Link to={`/events/${item.eventID}`} key={item._id} className="block">
      <div className="card bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm">
            {t("section")}: {translateMainSection(item.section.main)}{" "}
            {translateSubSection(item.section.main, item.section.sub)}
          </p>
          <p className="text-sm">
            {t("country")}: {translateCountry(item.country)}
          </p>
        </div>
      </div>
    </Link>
  );

  // Show loader when fetching wishlist data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Show a message when no user is signed in
  if (!currentUser) {
    return (
      <div className="text-center my-5">
        <p>You must be signed in to view your wishlist events.</p>
      </div>
    );
  }

  // Handle any error that occurred while fetching wishlist data
  if (error) {
    return (
      <div className="text-center my-5">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Helper function to translate the country name
  const translateCountry = (countryName) => {
    // Use the 't' function from i18next to look up translations for the country name
    return t(`countries.${countryName}`, { defaultValue: countryName });
  };

  // Helper function to translate the main section
  const translateMainSection = (mainSection) => {
    return t(`sections.${mainSection}`, { defaultValue: mainSection });
  };

  // Helper function to translate the subsection based on the main section
  const translateSubSection = (mainSection, subSection) => {
    // Dynamically map subsection translations based on main section type
    const sectionType = `${mainSection}Sections`;
    return t(`${sectionType}.${subSection}`, { defaultValue: subSection });
  };

  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 mb-52">
      <div className="flex items-center justify-center mb-8">
        <FontAwesomeIcon
          icon={faHeart}
          size="2x"
          className="text-red-600 mr-2"
        />
        <h1 className="text-3xl font-bold">{t("wishlist")}</h1>
      </div>

      {/* Country Filtering Dropdown */}
      <div className="flex items-center justify-center mb-8">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ALL">{t("all_countries")}</option>
          {/* Map through the keys of the countries object in the translation */}
          {Object.keys(t("countries", { returnObjects: true })).map(
            (countryKey) => (
              <option key={countryKey} value={countryKey}>
                {t(`countries.${countryKey}`)} {/* Translated country name */}
              </option>
            )
          )}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWishlist.length > 0 ? (
          filteredWishlist.map(renderItem)
        ) : (
          <p className="text-center col-span-full">{t("empty")}</p>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
