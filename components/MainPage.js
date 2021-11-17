import Image from "next/image";
import React, { useEffect, createRef } from "react";
import axios from "axios";
import leftIcon from "../public/assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const textInput = createRef();

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
