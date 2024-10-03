import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEvent from "../components/EditEvent";
import DeleteEvent from "../components/DeleteEvent";
import { useSelector } from "react-redux";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaravan,
  faCarSide,
  faTruckMonster,
  faHeart,
  faHeartBroken,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get(`/api/wishlist/${currentUser._id}`);
      const wishlistItems = response.data;
      setIsWishlisted(wishlistItems.some((item) => item.eventID === id));
    } catch (err) {
      console.error("Failed to check wishlist status:", err);
    }
  };

  useEffect(() => {
    fetchEvent();
    if (currentUser) {
      checkWishlistStatus();
    }
  }, [id, currentUser]);

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await axios.delete(`/api/wishlist/${id}/${currentUser._id}`);
      } else {
        await axios.post("/api/wishlist", {
          eventID: id,
          title: event.title,
          image: event.image,
          userID: currentUser._id,
          section: {
            main: event.section.main,
            sub: event.section.sub,
          },
          country: event.country,
        });
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error(
        `Failed to ${isWishlisted ? "remove from" : "add to"} wishlist:`,
        err
      );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );

  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  const eventUserId = event?.user?._id || event?.user?.currentUser?._id;
  const isEventOwner =
    currentUser && eventUserId && currentUser._id === eventUserId;

  const coordinates =
    event.coordinates && event.coordinates.length === 2
      ? {
          lat: parseFloat(event.coordinates[0]),
          lng: parseFloat(event.coordinates[1]),
        }
      : null;

  const handleDeleteSuccess = () => {
    navigate("/events");
  };

  const renderAccessIcon = () => {
    const iconSize = "lg";
    switch (event.access) {
      case 0:
        return <FontAwesomeIcon icon={faCaravan} size={iconSize} />;
      case 1:
        return <FontAwesomeIcon icon={faCarSide} size={iconSize} />;
      default:
        return <FontAwesomeIcon icon={faTruckMonster} size={iconSize} />;
    }
  };

  return (
    <main className="max-w-4xl mx-auto mt-5 p-4">
      <div className="flex flex-col gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-slate-800 text-center">
            {event.title}
          </h1>
          <div className="flex flex-col gap-8">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 w-full flex flex-col gap-4">
                <div className="text-left">
                  <p className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
                    {event.description}
                  </p>
                  <p className="mb-2">
                    <strong>Access:</strong> {renderAccessIcon()}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <strong>Country:</strong> {event.country}
                  </p>
                  {event.user && event.user.currentUser && (
                    <p>
                      <strong>Created by:</strong>{" "}
                      {event.user.currentUser.username}
                    </p>
                  )}
                  <button
                    onClick={handleWishlistToggle}
                    className={`mt-4 p-2 rounded-lg ${
                      isWishlisted ? "bg-red-600" : "bg-gray-600"
                    } text-white`}
                  >
                    <FontAwesomeIcon
                      icon={isWishlisted ? faHeartBroken : faHeart}
                    />
                    {isWishlisted
                      ? " Remove from Wishlist"
                      : " Add to Wishlist"}
                  </button>
                  {isEventOwner && (
                    <div className="flex gap-4 mt-4">
                      <EditEvent event={event} onSubmitSuccess={fetchEvent} />
                      <DeleteEvent
                        eventId={event._id}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isLoaded && coordinates && (
                <div className="md:w-1/2 w-full h-96 rounded-lg overflow-hidden">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={coordinates}
                    zoom={10}
                  >
                    <Marker position={coordinates} />
                  </GoogleMap>
                </div>
              )}
            </div>
            {event.map && (
              <a
                href={event.map}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold text-center py-3 px-4 rounded-lg"
              >
                <FontAwesomeIcon icon={faMap} style={{ marginRight: 10 }} />
                Map Link
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
