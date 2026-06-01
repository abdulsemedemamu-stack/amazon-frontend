import axios from "axios";

const axiosInstance = axios.create({
  // loccal instance url
  baseURL: "http://127.0.0.1:5005/e-clone-b9678/us-central1/api",
  // depoloyed version of amazone websit on render.com
  baseURL: "https://amazone-web-clone.onrender.com/",
});

export default axiosInstance;
