import axios from "axios";

export const testDriveAxios = axios.create({
  baseURL: "https://69c48d488a5b6e2dec2acab4.mockapi.io",
  headers: {
    Accept: "application/json",
  },
});

