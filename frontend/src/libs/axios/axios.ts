import axios from "axios";

export const apiServer = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
