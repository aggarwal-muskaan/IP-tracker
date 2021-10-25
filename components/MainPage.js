import Image from "next/image";
import React, { useEffect } from "react";
import axios from "axios";
import leftIcon from "../assets/icon-arrow.svg";

function MainPage({ userIp }) {
  const findCountryDetails = async () => {
    const ipAdd = `ipAdress=${userIp}`;
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}&${ipAdd}`
    );
  };

  useEffect(() => {
    findCountryDetails();
  }, []);

  return (
    <>
      <div>
        <h2>IP Address Tracker</h2>
        <div style={{ backgroundColor: "black" }}>
          <input type="text" />
          <Image src={leftIcon} alt="search-icon" />
        </div>
      </div>
    </>
  );
}

export default MainPage;
