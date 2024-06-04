import axios from "axios";
export const http = axios.create({
  baseURL: process.env.API_URL,
});

export const setToken = (token: string) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};
