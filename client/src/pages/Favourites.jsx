/* import React from "react";
import { useSelector } from "react-redux";
import Events from "./Events"; // Adjust the import path accordingly
import Wish from "../components/Wish";

const Favourites = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { wishlistsItems } = useSelector((state) => state?.wishlists);

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

  const filteredWishlistItems = wishlistsItems?.filter(
    (wishlist) => wishlist.userID === (currentUser ? currentUser._id : null)
  );

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="text-center my-5">
        {currentUser ? (
          <>
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center">
              {filteredWishlistItems.map((wishlist) => (
                <Wish
                  userId={currentUser._id}
                  key={wishlist?._id}
                  wishlist={wishlist}
                />
              ))}
            </div>
            <Events currentUserId={currentUser._id} />
          </>
        ) : (
          <p>You must be signed in to view your wishlist and events.</p>
        )}
      </div>
    </main>
  );
};

export default Favourites; */
