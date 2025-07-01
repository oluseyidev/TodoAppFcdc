import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
});

export const getTasks    = ()         => api.get("/tasks");
export const addTask     = (data)     => api.post("/tasks", data);
export const updateTask  = (id, data) => api.patch(`/tasks/${id}`, data);
export const deleteTask  = (id)       => api.delete(`/tasks/${id}`);