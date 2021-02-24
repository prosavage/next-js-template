import axios from "axios";
import { AxiosInstance } from "axios";
import getToken from "./TokenManager";

let axiosInstance: AxiosInstance;

const getAxios = () => {
  if (!axiosInstance) {
    buildAxios();
  }
  return axiosInstance;
};

export const buildAxios = () => {
  axiosInstance = undefined;
  axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      authorization: getToken(),
    },
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      const message = err.response.data?.error
      if (message === "Not logged in.") {
        window.location.href = "/marketplace/login";
        return;
      } else if (message === "Invalid token.") {
        window.location.href = "/marketplace/login"
        return;
      }

      
      throw err;
    }
  );
};

export default getAxios;
