import api from "../api/api";

export const getDashboardData = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};