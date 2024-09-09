import React from "react";
import { useSelector } from "react-redux";
import Events from "./Events"; // Adjust the import path accordingly

const MyEvents = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p>Error: {error}</p>
      </div>
    );
  }

  console.log(
    "Current User ID:",
    currentUser ? currentUser._id : "No current user"
  );

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="text-center my-5">
        {currentUser ? (
          <Events currentUserId={currentUser._id} hideAddEvent={true} />
        ) : (
          <p>You must be signed in to view your events.</p>
        )}
      </div>
    </main>
  );
};

export default MyEvents;
