import axios from "axios";

export const findByIp = async (searchIp) => {
  const ipAdd = `ipAddress=${searchIp}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${ipAdd}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
};

export const findByDomain = async (searchDomain) => {
  const myDomain = `domain=${searchDomain}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${myDomain}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
};
