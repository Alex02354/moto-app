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

const Events = ({
  country,
  currentUserId,
  section,
  subsection,
  hideAddEvent,
}) => {
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

      if (currentUserId) {
        // Assuming each event has a 'user' object with an '_id' property
        fetchedEvents = fetchedEvents.filter(
          (event) => event.user && event.user.currentUser._id === currentUserId
        );
        console.log("Filtered Events by currentUserId:", fetchedEvents);
      }

      // Filter events by country
      // Filter events by section (supporting an array of sections)
      if (section && Array.isArray(section)) {
        fetchedEvents = fetchedEvents.filter((event) =>
          section.includes(event.section.main)
        );
      } else if (section) {
        // For single section
        fetchedEvents = fetchedEvents.filter(
          (event) => event.section.main === section
        );
      }

      if (subsection && Array.isArray(subsection)) {
        fetchedEvents = fetchedEvents.filter((event) =>
          subsection.includes(event.section.sub)
        );
      } else if (subsection) {
        // For single subsection
        fetchedEvents = fetchedEvents.filter(
          (event) => event.section.sub === subsection
        );
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
  }, [currentUserId, country, section, subsection]);

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
      <div className="text-center my-5">
        {/* Conditionally render AddEvent if hideAddEvent is false and user is signed in */}
        {currentUser && !hideAddEvent && (
          <AddEvent onSubmitSuccess={fetchEvents} />
        )}
        {!currentUser && <p>You must be signed in to add an event.</p>}

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
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-left mt-0">
                    <p>
                      <strong>Country:</strong> {event.country}
                    </p>
                    <p>
                      <strong>Section:</strong> {event.section.main}
                    </p>
                    <p>
                      <strong>Subsection:</strong> {event.section.sub}
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
