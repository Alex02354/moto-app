import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);

  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{t("contact_us")}</h2>
          <p>{t("offroadonroad")}</p>
          <p>{t("email")}</p>
          <p>{t("phone")}</p>
        </div>
        <div className="flex justify-center space-x-4 text-2xl">
          <a
            href="https://www.facebook.com/offroadonroad.sk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.youtube.com/@off-roadonroad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/offroad_on_road"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <hr className="border-slate-400 my-5 max-w-7xl mx-auto px-4" />
      <div className="text-center py-4 mb-20 text-white">
        © 2024
        <a href="https://www.bravio.sk/" target="_blank">
          {" "}
          www.bravio.sk
        </a>{" "}
        {t("rights")}
      </div>
    </footer>
  );
}
