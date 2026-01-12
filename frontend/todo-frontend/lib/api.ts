import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post("/auth/register", { email, password, name }),
};

export const todoApi = {
  getAll: (status?: string) => {
    const params = status ? { status } : {};
    return api.get("/v1/todos", { params });
  },
  getById: (id: string) => api.get(`/v1/todos/${id}`),
  create: (data: { title: string; description?: string }) =>
    api.post("/v1/todos", data),
  update: (
    id: string,
    data: { title?: string; description?: string; status?: string }
  ) => api.put(`/v1/todos/${id}`, data),
  delete: (id: string) => api.delete(`/v1/todos/${id}`),
};

export default api;
