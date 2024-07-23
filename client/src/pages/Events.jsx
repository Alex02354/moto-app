import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddEvent from "../components/AddEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaravan,
  faCarSide,
  faTruckMonster,
} from "@fortawesome/free-solid-svg-icons";
import Wish from "../components/Wish";

const Events = ({ country, currentUserId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { wishlistsItems } = useSelector((state) => state?.wishlists);

  console.log(wishlistsItems);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      let fetchedEvents = response.data.data;

      console.log("Fetched Events:", fetchedEvents);

      if (currentUserId) {
        // Assuming each event has a 'user' object with an '_id' property
        fetchedEvents = fetchedEvents.filter(
          (event) => event.user && event.user.currentUser._id === currentUserId
        );
        console.log("Filtered Events by currentUserId:", fetchedEvents);
      }

      if (country) {
        fetchedEvents = fetchedEvents.filter(
          (event) => event.country === country
        );
        console.log("Filtered Events by country:", fetchedEvents);
      }

      setEvents(
        fetchedEvents.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentUserId, country]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getAccessIcon = (access) => {
    const iconSize = "xl";
    switch (access) {
      case 0:
        return <FontAwesomeIcon icon={faCaravan} size={iconSize} />;
      case 1:
        return <FontAwesomeIcon icon={faCarSide} size={iconSize} />;
      default:
        return <FontAwesomeIcon icon={faTruckMonster} size={iconSize} />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center">
        {wishlistsItems?.map((wishlist) => {
          return <Wish key={wishlist?._id} wishlist={wishlist} />;
        })}
      </div>
      <div className="text-center my-5">
        {currentUser ? (
          <AddEvent onSubmitSuccess={fetchEvents} />
        ) : (
          <p>You must be signed in to add an event.</p>
        )}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {events && events.length > 0 ? (
            events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="card w-96 bg-base-100 shadow-xl hover:border-yellow-400 border-2 border-black transition duration-300"
              >
                <figure className="px-5 pt-5">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center">
                    {getAccessIcon(event.access)}
                  </div>
                  <h2 className="card-title text-lime-800 font-bold mt-0">
                    {event.title}
                  </h2>
                  <div className="text-left mt-0">
                    <p>
                      {event.description}
                      {" --- "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left mt-0">
                    <p>
                      <strong>Country:</strong> {event.country}
                    </p>
                  </div>
                  <div className="text-left mt-0">
                    <p>
                      <strong>Section:</strong> {event.section}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Events;
