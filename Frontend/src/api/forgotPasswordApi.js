// Consolidated auth endpoints live in services/authService.js
// This file re-exports them for backward compatibility to avoid duplication.
export { sendOtp, verifyOtp, resetPassword } from "../services/authService";
