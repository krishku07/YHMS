import api from "./api";

// Get all fees
export const getFees = async () => {
  const response = await api.get("/fees");
  return response.data;
};

// Get fee by ID
export const getFeeById = async (id) => {
  const response = await api.get(`/fees/${id}`);
  return response.data;
};

// Get student fees
export const getStudentFees = async (studentId) => {
  const response = await api.get(`/fees/student/${studentId}`);
  return response.data;
};

// Same function if used elsewhere
export const getFeesByStudent = async (studentId) => {
  const response = await api.get(`/fees/student/${studentId}`);
  return response.data;
};

// Add fee
export const addFee = async (fee) => {
  const response = await api.post("/fees", fee);
  return response.data;
};

// Update fee
export const updateFee = async (id, fee) => {
  const response = await api.put(`/fees/${id}`, fee);
  return response.data;
};

// Delete fee
export const deleteFee = async (id) => {
  const response = await api.delete(`/fees/${id}`);
  return response.data;
};

// Download receipt
export const downloadReceipt = async (feeId) => {
    try {
      const response = await api.get(`/receipt/${feeId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `Receipt_${feeId}.pdf`);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Receipt download failed:", error);
      throw error;
    }
};
