import axios from "axios";
import { errorToast } from "../components/utils/errorToast";

export const findByIp = async (searchIp) => {
  const ipAdd = `ipAddress=${searchIp}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${ipAdd}`;

  return await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .catch((err) => {
      if (err.response) {
        console.log("response", err.response);
        errorToast(err.response.data.messages);
        Promise.reject(err.response);
      } else if (err.request) {
        console.log("request errors", err.request);
        errorToast(err.request.data.messages);
        Promise.reject(err.request);
      }
      return false;
    });
};

export const findByDomain = async (searchDomain) => {
  const myDomain = `domain=${searchDomain}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}&${myDomain}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        console.log("response", err.response);
        errorToast(err.response.data.messages);
        Promise.reject(err.response);
      } else if (err.request) {
        console.log("request errors", err.request);
        errorToast(err.request.data.messages);
        Promise.reject(err.request);
      }
      return false;
    });
};
