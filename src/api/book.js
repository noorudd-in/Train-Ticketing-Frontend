import axios from "axios";
import { BOOK_URL } from "../config";

export const newBooking = async (data, headers) => {
  try {
    const res = await axios.post(`${BOOK_URL}/booking`, data, { headers });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTicket = async (pnr, userId, headers) => {
  try {
    const res = await axios.post(
      `${BOOK_URL}/pnr/${pnr}`,
      { user_id: userId },
      { headers }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBookings = async (token, userId) => {
  try {
    const result = await axios.post(
      `${BOOK_URL}/tickets`,
      {
        user_id: userId,
      },
      {
        headers: {
          authtoken: token,
        },
      }
    );
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};
