import api from "./api";

export const getRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

export const getAvailableRooms = async () => {
  const response = await api.get("/rooms/available");
  return response.data;
};

export const addRoom = async (room) => {
  const response = await api.post("/rooms", room);
  return response.data;
};

export const updateRoom = async (id, room) => {
  const response = await api.put(`/rooms/${id}`, room);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await api.delete(`/rooms/${id}`);
  return response.data;
};