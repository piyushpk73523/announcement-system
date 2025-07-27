import axios from "axios";

const API_URL = "http://localhost:5000/api/announcements";

export const getAnnouncements = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getAnnouncementById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw error; // Re-throw to handle in components
  }
};

export const createAnnouncement = async (announcement) => {
  const response = await axios.post(API_URL, announcement);
  return response.data;
};

export const updateAnnouncement = async (id, announcement) => {
  const response = await axios.put(`${API_URL}/${id}`, announcement);
  return response.data;
};

export const deleteAnnouncement = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
