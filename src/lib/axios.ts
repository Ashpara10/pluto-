import axios from "axios";
import { BASE_URL } from "./url";
export const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
