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
  faTruckPickup,
} from "@fortawesome/free-solid-svg-icons";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data.data);
      console.log("Fetched events:", response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const getAccessIcon = (access) => {
    const iconSize = "xl"; // Define the size of the icon
    switch (access) {
      case 0:
        return <FontAwesomeIcon icon={faCaravan} size={iconSize} />;
      case 1:
        return <FontAwesomeIcon icon={faCarSide} size={iconSize} />;
      default:
        return <FontAwesomeIcon icon={faTruckMonster} size={iconSize} />;
    }
  };

  // Sort events by date in descending order (newest first)
  const sortedEvents = events.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="text-center my-5">
        {currentUser ? (
          <AddEvent onSubmitSuccess={fetchEvents} />
        ) : (
          <p>You must be signed in to add an event.</p>
        )}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {sortedEvents && sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
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
