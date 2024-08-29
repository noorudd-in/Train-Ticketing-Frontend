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

export const loginUser = async (email, password) => {
  try {
    const user = await axios.post(`${AUTH_URL}/login`, {
      email: email,
      password: password,
    });
    return user.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerUser = async ({ name, phone, email, password }) => {
  try {
    const user = await axios.post(`${AUTH_URL}/register`, {
      full_name: name,
      phone_number: phone,
      email,
      password,
    });
    return user.data;
  } catch (error) {
    return error.response.data;
  }
};
