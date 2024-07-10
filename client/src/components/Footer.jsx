import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>Email: contact@motoapp.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="flex justify-center space-x-4 text-2xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <hr className="border-slate-400 my-5 max-w-7xl mx-auto px-4" />
      <div className="text-center py-4 text-white">
        © 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
}
