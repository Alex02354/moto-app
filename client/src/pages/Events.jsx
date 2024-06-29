import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddEvent from "../components/AddEvent";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );
      setEvents(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold text-slate-800 my-5">Events</h1>
        {currentUser ? (
          <AddEvent onSubmitSuccess={fetchEvents} />
        ) : (
          <p>You must be signed in to add an event.</p>
        )}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {events.map((event) => (
            <div
              key={event._id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <div className="text-left">
                  <p>{event.description}</p>
                  <p>Access: {event.access}</p>
                  <p>Date: {new Date(event.date).toLocaleString()}</p>
                  <p>Section: {event.section}</p>
                  {event.user && event.user.username && (
                    <p>Created by: {event.user.username}</p>
                  )}
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-primary mt-2"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;
