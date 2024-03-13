import axios from "axios";
// // "https://stenhub-api.ulinin.com"
// https://teesbridal.onrender.com




const axiosInstance = axios.create({
  baseURL: "https://teesbridal.onrender.com",
});

export default axiosInstance;
