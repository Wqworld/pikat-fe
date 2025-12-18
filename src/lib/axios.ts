import axios from "axios";

const api = axios.create({
  baseURL: "https://piket-nekat-be.vercel.app",
  withCredentials: true,
});

export default api;
