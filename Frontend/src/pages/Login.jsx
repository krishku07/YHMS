import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Person,
  SchoolOutlined,
  AdminPanelSettingsOutlined,
  MeetingRoomOutlined,
  DashboardOutlined,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const MotionBox = motion(Box);

function AnimatedIcon({ children }) {
  return (
    <MotionBox
      animate={{
        y: [0, -6, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </MotionBox>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      // Clear previous authentication data
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("studentId");
      sessionStorage.removeItem("studentName");
      sessionStorage.removeItem("roomNumber");
      sessionStorage.removeItem("username");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("roomNumber");

      // Login request
      const response = await api.post("/auth/login", {
        username: username.trim(),
        password: password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      const data = response.data;

      // ==========================
      // GET JWT
      // ==========================

      const token =
        data.token ||
        data.accessToken ||
        data.jwt;

      if (!token) {
        setError(
          "Login failed: authentication token not received."
        );
        return;
      }

      // ==========================
      // GET ROLE
      // ==========================

      let role =
        data.role ||
        data.userRole ||
        data.authority;

      if (role) {
        role = role
          .toString()
          .replace("ROLE_", "")
          .toLowerCase();
      }

      // ==========================
      // DECODE JWT IF ROLE MISSING
      // ==========================

      if (!role) {
        try {
          const payload = JSON.parse(
            atob(
              token
                .split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/")
            )
          );

          if (payload.role) {
            role = payload.role
              .toString()
              .replace("ROLE_", "")
              .toLowerCase();
          }
        } catch (jwtError) {
          console.error("JWT decode error:", jwtError);
        }
      }

      if (!role) {
        setError(
          "Login failed: user role was not received."
        );
        return;
      }

      // ==========================
      // SAVE AUTHENTICATION
      // ==========================

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem(
        "username",
        username.trim()
      );

      // ==========================
      // SAVE STUDENT DATA
      // Keep auth data in sessionStorage and mirror the student
      // fields in localStorage because older student pages used it.
      // ==========================

      const studentId = data.studentId ?? data.id ?? data.student?.id;
      const studentName =
        data.studentName ?? data.name ?? data.student?.name;
      const roomNumber =
        data.roomNo ?? data.roomNumber ?? data.room?.roomNo ?? data.student?.roomNo ?? data.student?.roomNumber;

      if (studentId !== undefined && studentId !== null) {
        sessionStorage.setItem("studentId", String(studentId));
        localStorage.setItem("studentId", String(studentId));
      }

      if (studentName) {
        sessionStorage.setItem("studentName", String(studentName));
        localStorage.setItem("studentName", String(studentName));
      }

      if (roomNumber !== undefined && roomNumber !== null && String(roomNumber).trim() !== "") {
        sessionStorage.setItem("roomNumber", String(roomNumber));
        localStorage.setItem("roomNumber", String(roomNumber));
      }

      console.log("LOGIN ROLE:", role);
      console.log(
        "TOKEN SAVED:",
        !!sessionStorage.getItem("token")
      );

      // ==========================
      // REDIRECT
      // ==========================

      if (role === "student") {
        navigate("/student", {
          replace: true,
        });

        return;
      }

      if (
        role === "admin" ||
        role === "junior_admin"
      ) {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      // Unknown role
      sessionStorage.clear();

      setError(
        "Invalid user role. Please contact administrator."
      );
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid username or password.");
        } else if (err.response.status === 403) {
          setError(
            "Access denied. Please contact administrator."
          );
        } else if (err.response.data) {
          if (
            typeof err.response.data === "string"
          ) {
            setError(err.response.data);
          } else {
            setError(
              err.response.data.message ||
                "Login failed. Please try again."
            );
          }
        } else {
          setError(
            "Login failed. Please try again."
          );
        }
      } else {
        setError(
          "Unable to connect to server. Please check that the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background:
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ==========================
          BACKGROUND DECORATIONS
      ========================== */}

      <MotionBox
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,0.08)",
          top: -100,
          left: -100,
          filter: "blur(2px)",
        }}
      />

      <MotionBox
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,0.07)",
          bottom: -150,
          right: -100,
        }}
      />

      {/* ==========================
          LEFT BRANDING
      ========================== */}

      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          width: "50%",
          flexDirection: "column",
          justifyContent: "center",
          px: {
            md: 6,
            lg: 10,
          },
          color: "white",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "18px",
              background:
                "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:
                "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <DashboardOutlined
              sx={{
                fontSize: 34,
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                letterSpacing: "-1px",
              }}
            >
              Hostel ERP
            </Typography>

            <Typography
              sx={{
                opacity: 0.8,
              }}
            >
              Hostel Management System
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: {
              md: "42px",
              lg: "52px",
            },
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          Manage your hostel
          <br />

          <Box
            component="span"
            sx={{
              opacity: 0.8,
            }}
          >
            smarter.
          </Box>
        </Typography>

        <Typography
          sx={{
            maxWidth: 520,
            fontSize: 17,
            opacity: 0.85,
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          A modern hostel management platform
          designed to simplify students, employees,
          rooms, fees and outpass management.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.2,
          }}
        >
          <Feature
            icon={<MeetingRoomOutlined />}
            title="Room Management"
            description="Manage rooms and occupancy easily."
          />

          <Feature
            icon={<SchoolOutlined />}
            title="Student Portal"
            description="Give students access to their information."
          />

          <Feature
            icon={<AdminPanelSettingsOutlined />}
            title="Admin Panel"
            description="Complete control over hostel operations."
          />
        </Box>
      </Box>

      {/* ==========================
          RIGHT LOGIN
      ========================== */}

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: {
            xs: 2,
            sm: 4,
          },
          py: 4,
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          style={{
            width: "100%",
            maxWidth: "480px",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
              borderRadius: "28px",
              background:
                "rgba(255,255,255,0.96)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.18)",
            }}
          >
            {/* Login Icon */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  boxShadow:
                    "0 12px 30px rgba(99,102,241,0.35)",
                }}
              >
                <AnimatedIcon>
                  <LockOutlined
                    sx={{
                      fontSize: 34,
                    }}
                  />
                </AnimatedIcon>
              </Box>
            </Box>

            {/* Title */}

            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{
                color: "#111827",
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              textAlign="center"
              sx={{
                color: "#6b7280",
                mb: 4,
              }}
            >
              Sign in to access your dashboard
            </Typography>

            {/* Error */}

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {/* Form */}

            <Box
              component="form"
              onSubmit={handleLogin}
            >
              {/* Username */}

              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                disabled={loading}
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          color: "#6366f1",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#6366f1",
                  },
                }}
              />

              {/* Password */}

              <TextField
                fullWidth
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{
                          color: "#6366f1",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#6366f1",
                  },
                }}
              />

              {/* Forgot Password */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 3,
                }}
              >
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  sx={{
                    textTransform: "none",
                    color: "#6366f1",
                    fontWeight: 600,
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>

              {/* Login Button */}

              <Button
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  height: 54,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  background:
                    "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow:
                    "0 10px 25px rgba(99,102,241,0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    boxShadow:
                      "0 14px 30px rgba(99,102,241,0.4)",
                  },
                  "&.Mui-disabled": {
                    color: "white",
                    background:
                      "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    opacity: 0.7,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <Typography
              textAlign="center"
              variant="body2"
              sx={{
                color: "#9ca3af",
              }}
            >
              Hostel Management System
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}

function Feature({
  icon,
  title,
  description,
}) {
  return (
    <MotionBox
      whileHover={{
        x: 8,
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "14px",
          background:
            "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border:
            "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 25,
          },
        })}
      </Box>

      <Box>
        <Typography
          fontWeight={700}
          sx={{
            fontSize: 15,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            opacity: 0.72,
          }}
        >
          {description}
        </Typography>
      </Box>
    </MotionBox>
  );
}