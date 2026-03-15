import axios from "axios";
import Cookies from "js-cookie";

interface AxiosQueryArgs {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: any;
  headers?: any;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const mainApi = axios.create({
  baseURL,
  // withCredentials: true,
});

const lang = localStorage.getItem("i18nextLng") || "ar";
mainApi.interceptors.request.use((config) => {
  const token = Cookies.get("N8NCentral_token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Language"] = lang;
  config.headers["Accept-Language"] = lang;

  if (
    config.data &&
    typeof config.data === "object" &&
    !(config.data instanceof FormData)
  ) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export const axiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
  async ({ url, method, data, params = {}, headers = {} }: AxiosQueryArgs) => {
    try {
      const result = await mainApi({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (error: any) {
      if (
        error.response?.status === 401 &&
        window.location.pathname !== `/${lang}/login`
      ) {
        Cookies.remove("N8NCentral_token");
        if (!window.location.href.endsWith("login")) {
          window.location.href = `/${lang}/login`;
        }
      }

      return {
        error: {
          status: error.response?.status || null,
          data: error.response?.data || error.message,
        },
      };
    }
  };
