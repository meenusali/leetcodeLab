import axios from "axios";
const protocol = window.location.protocol;

console.log("protocol ",protocol)
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${protocol}//localhost:8080/api/v1`
      : `${protocol}//codexium.online/api/v1`,
  withCredentials: true,
});