import axios from "axios";

const api = axios.create({
  baseURL: "https://piket-nekat-be.vercel.app/", 
  withCredentials: true, 
  
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;