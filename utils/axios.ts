import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://69cdc9c833a09f831b7c8a17.mockapi.io",
  headers: {
    Accept: "application/json",
  },
});

