import axios from "axios";
import { AUTH_URL } from "../config";

export const getProfile = async (token, userId) => {
  try {
    const profile = await axios.get(`${AUTH_URL}/profile/${userId}`, {
      headers: {
        authtoken: token,
      },
    });
    return profile.data;
  } catch (error) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("UserId");
    return error.response.data;
  }
};
