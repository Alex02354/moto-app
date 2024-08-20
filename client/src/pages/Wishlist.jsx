import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
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

    if (currentUser) {
      fetchWishlist();
    }
  }, [currentUser]);

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
        </div>
      </div>
    </Link>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center my-5">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 mb-52">
      <div className="flex items-center justify-center mb-8">
        <FontAwesomeIcon
          icon={faHeart}
          size="2x"
          className="text-red-600 mr-2"
        />
        <h1 className="text-3xl font-bold">Wishlist</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map(renderItem)
        ) : (
          <p className="text-center col-span-full">Your wishlist is empty.</p>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
