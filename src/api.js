// api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Set your base URL here
  timeout: 10000, // Optional: Set a timeout for requests
});

const Api = {
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error; // Re-throw the error for further handling
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  },
};

export default Api;
