import api from "../api/api";

export const login = async (name, password) => {
  const response = await api.post("/auth/login", {
    username: name,
    password: password,
  });

  return response.data;
};

// SEND OTP
export const sendOtp = async (mobile) => {
  const response = await api.post("/auth/forgot-password", {
    mobile,
  });

  return response.data;
};

// VERIFY OTP
export const verifyOtp = async (mobile, otp) => {
  const response = await api.post("/auth/verify-otp", {
    mobile,
    otp,
  });

  return response.data;
};

// RESET PASSWORD
/*export const resetPassword = async (mobile, password) => {
  const response = await api.post("/auth/reset-password", {
    mobile,
    password,
  });

  return response.data;
};  */

export const resetPassword = async (mobile, newPassword) => {

    const response = await api.post("/auth/reset-password", {
        mobile,
        newPassword
    });

    return response.data;
};