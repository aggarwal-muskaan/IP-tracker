import Image from "next/image";
import React, { useState, useEffect, createRef } from "react";

import { findByDomain, findByIp } from "../services/findLocation";
import styles from "../styles/MainPage.module.css";

import leftIcon from "../public/assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const textInput = createRef();
  const [state, setState] = useState({
    info: { ip: "", country: "", timezone: "", isp: "" },
    location: { lat: 0, lng: 0 },
  });

  // destructuring my local state Object
  const { ip, country, timezone, isp } = state.info;
  const { lat, lng } = state.location;

  useEffect(() => {
    findCountryDetails();
  }, []);

  const findCountryDetails = async (rawUserInput = userIp) => {
    const userInput = rawUserInput.trim();
    let response;
    if (userInput !== userIp) {
      if (isDomain(userInput)) {
        // searched input is a Domain name
        response = await findByDomain(userInput);
      }
      // searched input is a IP address
      else response = await findByIp(userInput);
    } else {
      // user's IP
      response = await findByIp(userInput);
    }
    updateLocation(response);
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
      <div className={styles.header}>
        <h2>IP Address Tracker</h2>
        <div style={{ backgroundColor: "black" }}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            ref={textInput}
            onKeyDown={(event) => handleEnterOnly(event)}
          />
          <Image
            src={leftIcon}
            alt="search-icon"
            onClick={() => findCountryDetails(textInput.current.value)}
          />
        </div>

        <div>
          <div>
            <small>IP Address</small>
            <h3>{ip}</h3>
          </div>
          <div>
            <small>location</small>
            <h3>{country}</h3>
          </div>
          <div>
            <small>Timezone</small>
            <h3>{timezone}</h3>
          </div>
          <div>
            <small>ISP</small>
            <h3>{isp}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
