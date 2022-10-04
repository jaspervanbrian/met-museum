import axios from "axios";
import rateLimit from "axios-rate-limit";
import { setupCache } from "axios-cache-interceptor";

const axiosInit = axios.create({
  baseURL: "https://collectionapi.metmuseum.org",
});

const axiosInstance = rateLimit(setupCache(axiosInit), { maxRPS: 80 });

export default axiosInstance;
