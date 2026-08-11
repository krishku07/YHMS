import api from "./api";

export const getNotices = async () => {
  const response = await api.get("/notices");
  return response.data;
};

export const getStudentNotices = async (studentId) => {
  const response = await api.get(`/notices/student/${studentId}`);
  return response.data;
};

export const addNotice = async (notice) => {
  const response = await api.post("/notices", notice);
  return response.data;
};

export const updateNotice = async (id, notice) => {
  const response = await api.put(`/notices/${id}`, notice);
  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await api.delete(`/notices/${id}`);
  return response.data;
};