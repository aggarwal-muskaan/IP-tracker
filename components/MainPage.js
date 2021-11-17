import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import leftIcon from "../public/assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const [input, setInput] = useState("");

  const findCountryDetails = async (searchIp = userIp) => {
    const ipAdd = `ipAddress=${searchIp}`;
    // const ipAdd = `domain=vercel.org`;

    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}&${ipAdd}`
    );
    console.log(searchIp, response);
  };

  useEffect(() => {
    findCountryDetails();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  const handleEnterOnly = (event) => {
    if (event.key === "Enter") findCountryDetails(event.target.value);
  };

  return (
    <>
      <div>
        <h2>IP Address Tracker</h2>
        <div style={{ backgroundColor: "black" }}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={input}
            onChange={(event) => handleInputChange(event)}
            onKeyDown={(event) => handleEnterOnly(event)}
          />
          <Image
            src={leftIcon}
            alt="search-icon"
            onClick={findCountryDetails}
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
