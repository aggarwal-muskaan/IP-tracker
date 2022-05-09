import Image from "next/image";
import React, { useState, useEffect, createRef } from "react";

import { findByDomain, findByIp } from "../services/findLocation";
import FindOnMap from "./FindOnMap";
import { validateIP, validateDomain } from "./utils/validateIP";
import { errorToast } from "./utils/errorToast";
import styles from "../styles/MainPage.module.css";

import leftIcon from "../public/assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const [isAdBlockExtension, setExtensionState] = useState(false);
  const textInput = createRef();
  const [state, setState] = useState({
    info: { ip: "", country: "", timezone: "", isp: "" },
    location: { lat: 0, lng: 0 },
  });

  // destructuring local state Object
  const { ip, country, timezone, isp } = state.info;

  useEffect(() => {
    const adBlocker = document.querySelector(".ad-zone");
    const x_height = adBlocker.offsetHeight;

    // console.log(navigator.brave, navigator.brave.isBrave()); true for Brave-browser
    if (x_height) {
      adBlocker.style.display = "none";
      findCountryDetails();
    } else {
      setExtensionState(true);
    }
  }, []);

  const findCountryDetails = async (rawUserInput = userIp) => {
    const userInput = rawUserInput.trim();
    let response;
    if (userInput !== userIp) {
      if (isDomain(userInput)) {
        // searched input is a Domain name
        if (validateIP(userInput)) response = await findByDomain(userInput);
        else errorToast("Invalid IP-address or domain");
      } else {
        // searched input is a IP address
        if (validateDomain(userInput)) response = await findByIp(userInput);
        else errorToast("Invalid IP-address or domain");
      }
    } else {
      // user's IP
      response = await findByIp(userInput);
    }
    if (response.location) updateLocation(response);
  };

  const isDomain = (userInput) => {
    const newInput = userInput.replace(/\./g, "");
    return isNaN(newInput);
  };

  const updateLocation = (response) => {
    const { ip, isp } = response;
    const { city, country, timezone, postalCode, lat, lng } = response.location;

    const newCountry = `${city}, ${country} ${postalCode}`;
    const newTimezone = `UTC ${timezone}`;

    const newState = {
      info: { ip: ip, country: newCountry, timezone: newTimezone, isp: isp },
      location: { lat: lat, lng: lng },
    };
    // setting state
    setState(newState);
  };

  const handleEnterOnly = (event) => {
    if (event.key === "Enter") findCountryDetails(textInput.current.value);
  };

  return (
    <>
      <div className="ad-zone ad-space ad-unit textads banner-ads banner_ads" />

      <div className={styles.header}>
        <h2 className={styles.headingTracker}>IP Address Tracker</h2>
        <div className={styles.inputField}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              ref={textInput}
              onKeyDown={(event) => handleEnterOnly(event)}
              className={`${styles.textInput} ${
                isAdBlockExtension && styles.disableTextInput
              }`}
              disabled={isAdBlockExtension}
            />
          </div>
          <div
            className={`${styles.forwardIcon} ${
              isAdBlockExtension && styles.disableTextInput
            }`}
          >
            <Image
              src={leftIcon}
              alt="search-icon"
              onClick={() => findCountryDetails(textInput.current.value)}
            />
          </div>
        </div>

        {isAdBlockExtension ? (
          <div className={styles.addressDetails}>
            <p className={styles.centerText}>
              Please remove Ad-blocker to access the site.
            </p>
          </div>
        ) : (
          <div className={styles.addressDetails}>
            <div className={styles.detailContainer}>
              <small className={styles.detailLabel}>IP Address</small>
              <h3 className={styles.detailInfo}>{ip}</h3>
            </div>
            <div className={styles.detailContainer}>
              <small className={styles.detailLabel}>location</small>
              <h3 className={styles.detailInfo}>{country}</h3>
            </div>
            <div className={styles.detailContainer}>
              <small className={styles.detailLabel}>Timezone</small>
              <h3 className={styles.detailInfo}>{timezone}</h3>
            </div>
            <div className={styles.detailContainer}>
              <small className={styles.detailLabel}>ISP</small>
              <h3 className={styles.detailInfo}>{isp}</h3>
            </div>
          </div>
        )}
      </div>

      <FindOnMap latLong={state.location} />
    </>
  );
}

export default MainPage;
