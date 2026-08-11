import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Smartphone, Loader2 } from "lucide-react";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP CONTROL
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hidden email returned from backend
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!mobile.trim()) {
      setError("Enter Mobile Number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await sendOtp(mobile);
      if (res.email) {
        setMaskedEmail(res.email);
        setError("");
        setStep(2);
      } else {
        setError(res.message || "Unable to send OTP");
      }
    } catch {
      setError("Unable to send OTP");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Enter OTP");
      return;
    }

    try {
      const res = await verifyOtp(mobile, otp);
      if (res === "OTP Verified Successfully") {
        alert("OTP Verified");
        setError("");
        setStep(3);
      } else if (res && res.message) {
        setError(res.message);
      } else {
        setError(res || "OTP Verification Failed");
      }
    } catch {
      setError("OTP Verification Failed");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword(mobile, newPassword);
      if (res === "Password Changed Successfully") {
        alert("Password Updated Successfully");
        navigate("/");
      } else if (res && res.message) {
        setError(res.message);
      } else {
        setError(res || "Unable to change password");
      }
    } catch {
      setError("Unable to change password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1E1B4B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: 430,
          background: "rgba(30,41,59,0.75)",
          borderRadius: 20,
          padding: 35,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "none",
            color: "#8B5CF6",
            cursor: "pointer",
            marginBottom: 15,
          }}
        >
          <ArrowLeft size={22} />
        </button>

        <h2 style={{ color: "white", textAlign: "center", marginBottom: 8 }}>
          Forgot Password
        </h2>
        <p style={{ color: "#94A3B8", textAlign: "center", marginBottom: 30 }}>
          Enter your registered mobile number
        </p>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div style={{ position: "relative" }}>
                <Smartphone
                  size={18}
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    color: "#94A3B8",
                  }}
                />
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                  style={{
                    width: "100%",
                    padding: "13px 15px 13px 42px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "#1E293B",
                    color: "white",
                  }}
                />
              </div>

              {error && <p style={{ color: "#EF4444", marginTop: 15 }}>{error}</p>}

              <button
                onClick={handleSendOtp}
                disabled={loading}
                style={{
                  marginTop: 25,
                  width: "100%",
                  background: "#8B5CF6",
                  color: "#111",
                  border: "none",
                  borderRadius: 12,
                  padding: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div
                style={{
                  background: "#064E3B",
                  padding: 18,
                  borderRadius: 12,
                  color: "white",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                ✅ OTP Sent Successfully
                <br />
                <br />
                OTP sent to
                <br />
                <b>{maskedEmail}</b>
              </div>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 Digit OTP"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.1)",
                  background: "#1E293B",
                  color: "white",
                  marginBottom: 15,
                }}
              />

              {error && (
                <p style={{ color: "#EF4444", marginBottom: 15 }}>{error}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                style={{
                  width: "100%",
                  padding: 14,
                  border: "none",
                  borderRadius: 12,
                  background: "#8B5CF6",
                  color: "#111",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Verify OTP
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h3 style={{ color: "white", textAlign: "center", marginBottom: 20 }}>
                Create New Password
              </h3>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: 12,
                  background: "#1E293B",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "white",
                  marginBottom: 15,
                }}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: 12,
                  background: "#1E293B",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "white",
                  marginBottom: 15,
                }}
              />

              {error && <p style={{ color: "#EF4444" }}>{error}</p>}

              <button
                onClick={handleResetPassword}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 12,
                  background: "#8B5CF6",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Change Password
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


