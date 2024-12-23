import axios from "axios";
import { ADMIN_CATEGORIES } from "../api";
import Cookies from "js-cookie";

export const fetchCategories = async (page: number, size: number) => {
  try {
    const token = Cookies.get("token");
    const query = `?page=${page}&max_per_page=${size}`;

    const response = await axios.get(`${ADMIN_CATEGORIES}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};
