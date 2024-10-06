import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import Modal from "../components/Modal"; // Assuming you already have this component
import "../data/i18n";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state for sign-out confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Modal state for delete account confirmation

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleFileUpload = useCallback(async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            profilePicture: downloadURL,
          }))
        );
      }
    );
  }, []);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const openSignOutModal = () => setModalOpen(true);
  const closeSignOutModal = () => setModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  return (
    <main className="max-w-7xl mx-auto mt-10">
      <div className="px-4 my-5 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 my-5 text-center">
          {t("profile")}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">{t("success")}</span>
            ) : (
              ""
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder={t("username")}
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder={t("password")}
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? t("loading") : t("update")}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={openDeleteModal}
            className="text-red-700 cursor-pointer"
          >
            {t("delete_account")}
          </span>
          <span
            onClick={openSignOutModal}
            className="text-red-700 cursor-pointer"
          >
            {t("sign_out")}
          </span>
        </div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "User is updated successfully!"}
        </p>

        {/* Sign Out Confirmation Modal */}
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">{t("sign_out")}</h3>
            <p>{t("sign_out_warning")}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  handleSignOut();
                  closeSignOutModal();
                }}
                className="btn bg-yellow-400 hover:bg-yellow-600 text-black"
              >
                {t("yes")}
              </button>
              <button onClick={closeSignOutModal} className="btn bg-danger">
                {t("no")}
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">{t("delete_account")}</h3>
            <p>{t("delete_account_warning")}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  handleDeleteAccount();
                  closeDeleteModal();
                }}
                className="btn bg-yellow-400 hover:bg-yellow-600 text-black"
              >
                {t("yes")}
              </button>
              <button onClick={closeDeleteModal} className="btn bg-danger">
                {t("no")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
