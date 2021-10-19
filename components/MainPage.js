import React, { useEffect } from "react";
import axios from "axios";

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

  return <></>;
}

export default MainPage;
