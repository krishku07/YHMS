import api from "./api";

// Get all students (Admin)
export const getStudents = async () => {
    const response = await api.get("/students");
    return response.data;
};

// Get logged-in student profile
export const getStudentProfile = async () => {
    const response = await api.get("/student/profile");
    return response.data;
};

// Get student by ID (Admin)
export const getStudentById = async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
};

// Add student
export const addStudent = async (student) => {
    const response = await api.post("/students", student);
    return response.data;
};

// Update student
export const updateStudent = async (id, student) => {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
};