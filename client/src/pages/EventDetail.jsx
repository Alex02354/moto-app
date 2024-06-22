import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`
        );
        setEvent(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <main className="max-w-8xl mx-auto mt-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold  mb-4 text-slate-800">
          {event.title}
        </h1>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
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
              <div className="text-left">
                <p>{event.description}</p>
                <p>Coordinates: {event.coordinates.join(", ")}</p>
                <p>Access: {event.access}</p>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>Section: {event.section}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;
