// utils/fetchProfile.js
import axios from "axios";

export const fetchProfile = async () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  try {
    const response = await axios.get(`${baseUrl}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile");
  }
};