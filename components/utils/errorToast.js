import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorToast = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};
