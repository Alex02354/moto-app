import React from "react";
import CookieConsent, { resetCookieConsentValue } from "react-cookie-consent";

//function for resetting the cookie consent
/* console.log(resetCookieConsentValue()); */

const CookieBanner = () => {
  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      location="bottom"
      buttonText="I understand"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        color: "#4e503b",
        fontSize: "13px",
        background: "yellow",

        padding: "8px 10px",
      }}
      expires={365}
    >
      We use cookies to ensure you get the best experience on our website.{" "}
      <a href="/privacy-policy" style={{ color: "white" }}>
        Learn more
      </a>
    </CookieConsent>
  );
};

export default CookieBanner;
