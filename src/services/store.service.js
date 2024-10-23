import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_RESTO_API}`; 

const getAllStores = () => {
  return axios.get(API_URL); // Fetch all stores
};

const getStoreById = (id) => {
  return axios.get(`${API_URL}/${id}`); // Fetch store by ID
};

const addStore = (storeData) => {
  return axios.post(API_URL, storeData); // Add a new store
};

const updateStore = (id, storeData) => {
  return axios.put(`${API_URL}/${id}`, storeData); // Update store by ID
};

const deleteStore = (id) => {
  return axios.delete(`${API_URL}/${id}`); // Delete store by ID
};

// Export the functions
export default {
  getAllStores,
  getStoreById,
  addStore,
  updateStore,
  deleteStore,
};
