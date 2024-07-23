import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeWishlist, fetchWishlist } from "../redux/wishlist/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Wish = ({ wishlist }) => {
  const { _id, image, title } = wishlist;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const removeWishlishHandler = (wishlist) => {
    dispatch(removeWishlist(wishlist));
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow md:flex-row md:max-w-xl dark:bg-gray-900">
      <Link to={`/events/${_id}`}>
        <img
          className="object-cover w-full rounded-t-lg h-96 mx-2 my-1 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image}
          alt=""
        />
      </Link>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>

        <div className="flex flex-row items-center py-1">
          <button
            onClick={() => removeWishlishHandler(wishlist)}
            className="dark:text-rose-600"
          >
            <FontAwesomeIcon className="text-red-600" icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wish;
