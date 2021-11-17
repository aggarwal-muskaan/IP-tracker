import Image from "next/image";
import axios from "axios";
import React, { useEffect, createRef } from "react";

import { findByDomain, findByIp } from "../services/findLocation";
import leftIcon from "../public/assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const textInput = createRef();

  useEffect(() => {
    findCountryDetails();
  }, []);

  const findCountryDetails = async (rawUserInput = userIp) => {
    const userInput = rawUserInput.trim();
    if (userInput !== userIp) {
      let response;
      if (isDomain(userInput)) {
        // searched input is a Domain name
        response = await findByDomain(userInput);
      }
      // searched input is a IP address
      else response = await findByIp(userInput);
      console.log(response);
    } else {
      // user's IP
      const response = await findByIp(userInput);
    }
  };

  const isDomain = (userInput) => {
    const newInput = userInput.replace(/\./g, "");
    return isNaN(newInput);
  };

  const handleEnterOnly = (event) => {
    if (event.key === "Enter") findCountryDetails(textInput.current.value);
  };

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default MainPage;
