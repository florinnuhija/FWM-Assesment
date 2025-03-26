import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchItems(page: number, limit: number) {
  const response = await axios.get(`${API_BASE_URL}/items`, {
    params: { page, limit },
  });
  return response.data;
}
