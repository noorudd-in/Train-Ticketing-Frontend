import axios from "axios";
import { SEARCH_URL } from "../config";

export const getRoutes = async (from, to) => {
  try {
    const data = await axios.get(`${SEARCH_URL}/search?from=${from}&to=${to}`);
    return data.data;
  } catch (error) {
    return error.response.data;
  }
};
