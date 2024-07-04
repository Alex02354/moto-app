import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEvent from "../components/EditEvent";
import DeleteEvent from "../components/DeleteEvent";
import { useSelector } from "react-redux";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

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

  useEffect(() => {
    fetchEvent();
  }, [id]);

  useEffect(() => {
    console.log("Current User:", currentUser);
    if (event) {
      console.log("Event User:", event.user);
    }
  }, [currentUser, event]);

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

  console.log("isEventOwner:", isEventOwner);
  console.log("Current User ID:", currentUser?._id);
  console.log("Event User ID:", eventUserId);

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

  return (
    <main className="max-w-8xl mx-auto mt-10">
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
              <h1 className="text-3xl font-bold mb-4 text-slate-800">
                {event.title}
              </h1>
              <p>{event.description}</p>
              <p>
                Coordinates:{" "}
                {coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "N/A"}
              </p>
              <p>Access: {event.access === 0 ? "plane" : "car"}</p>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Section: {event.section}</p>
            </div>
            {isEventOwner && (
              <>
                <EditEvent event={event} onSubmitSuccess={fetchEvent} />
                <DeleteEvent
                  eventId={event._id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </>
            )}
          </div>
        </div>
        {isLoaded && coordinates && (
          <div className="w-96 h-96">
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
    </main>
  );
};

export default EventDetail;
