import React from "react";
import { useSelector } from "react-redux";
import Events from "./Events"; // Adjust the import path accordingly
import "../data/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const MyEvents = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

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
          <p>{t("signin_warn")}</p>
        )}
      </div>
    </main>
  );
};

export default MyEvents;
