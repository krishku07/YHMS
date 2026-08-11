import api from "./api";

// Get All Employees
export const getEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
};

// Add Employee
export const addEmployee = async (employee) => {
    const response = await api.post("/employees", employee);
    return response.data;
};

// Update Employee
export const updateEmployee = async (id, employee) => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};