import axios from "axios";
import { addUser, removeUser } from "./Store/authSlice";

export const capitalize = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/getcurrentuser`,
      {},
      {
        withCredentials: true,
      }
    );

    const user = response.data?.data;

    if (user) {
      dispatch(addUser(user));
    } else {
      dispatch(removeUser());
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    dispatch(removeUser());
  }
};
