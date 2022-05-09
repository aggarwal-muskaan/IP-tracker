import axios from "axios";

export const findByIp = async (searchIp) => {
  const ipAdd = `ipAddress=${searchIp}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${ipAdd}`;

  return await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .catch((err) => {
      if (err.response) console.log("response");
      if (err.request) {
        console.log("request errors", err.request);
      }
      Promise.reject(err);
      return false;
      /* todo : special IP ignore, map center, responsive style, toast errors */
    });
};

export const findByDomain = async (searchDomain) => {
  const myDomain = `domain=${searchDomain}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${myDomain}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
};
