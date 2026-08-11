import api from "./api";

// Student submits outpass request
export const submitOutpass = async (request) => {
    const response = await api.post("/outpasses", request);
    return response.data;
};

// Student history
export const getStudentOutpasses = async (studentId) => {

    const response = await api.get(`/outpasses/student/${studentId}`);

    return response.data;

};

// Admin gets all requests
export const getAllOutpasses = async () => {
    const response = await api.get("/outpasses");
    return response.data;
};

// Approve request
export const approveOutpass = async (id) => {
    const response = await api.put(`/outpasses/${id}/approve`);
    return response.data;
};

// Reject request
export const rejectOutpass = async (id) => {
    const response = await api.put(`/outpasses/${id}/reject`);
    return response.data;
};

// Delete request
export const deleteOutpass = async (id) => {
    const response = await api.delete(`/outpasses/${id}`);
    return response.data;
};