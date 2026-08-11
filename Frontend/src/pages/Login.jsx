import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Eye, EyeOff, Mail, ArrowRight, Loader2 } from "lucide-react";
import { login } from "../services/authService";
import RotatingRing from "../components/RotatingRing";
import AnimatedLock from "../components/AnimatedLock";
import AnimatedKey from "../components/AnimatedKey";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Animation state machine
  const [animState, setAnimState] = useState("idle");
  // idle | signing | keyEntering | keyInserted | keyTurning | unlocking | granted | denied | fadingOut

  const [lockState, setLockState] = useState("idle");
  const [keyState, setKeyState] = useState("idle");
  const [showKey, setShowKey] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);

    // Start animation sequence
    setAnimState("signing");
    setLockState("idle");

    // Step 1-2: Button changes to "Signing In..." with spinner
    setTimeout(() => {
      // Step 3: Key appears from the right
      setShowKey(true);
      setKeyState("entering");
      setAnimState("keyEntering");

      // Step 4: Key slides toward lock
      setTimeout(() => {
        setKeyState("inserted");
        setAnimState("keyInserted");

        // Now call the actual API to check credentials
        const performLogin = async () => {
          try {
            const res = await login(email, password);

            console.log("Login Response:", res);

            if (!res.success) {
              // FAILED LOGIN: Key enters, lock refuses
              setAnimState("denied");
              setLockState("denied");

              // Step 5b: Key rotates back
              setTimeout(() => {
                setKeyState("removing");

                // Step 6b: Key comes out
                setTimeout(() => {
                  setShowKey(false);
                  // Lock shakes
                  setLockState("idle");
                  setAnimState("idle");
                  setLoading(false);
                  setError(res.message || "Invalid Email or Password");
                  setKeyState("idle");
                }, 500);
              }, 400);

              return;
            }

            // SUCCESS: Continue animation
            // Step 5: Key rotates 90 degrees
            setKeyState("turning");
            setAnimState("keyTurning");

            setTimeout(() => {
              // Step 6: Lock opens
              setLockState("unlocked");
              setAnimState("unlocking");

              // Step 7: Display Access Granted
              setTimeout(() => {
                setShowSuccess("Access Granted");
                setAnimState("granted");

                // Save login data
                localStorage.setItem("token", res.token);
                localStorage.setItem("role", res.role);

                if (res.role === "admin") {
                  localStorage.setItem("adminName", email);
                } else {
                  localStorage.setItem("studentId", String(res.studentId));
                  localStorage.setItem("studentName", res.studentName);
                  localStorage.setItem("mobile", res.mobile);
                  localStorage.setItem("roomNumber", res.roomNo);
                }

                // Step 8: Card fades away, dashboard fades in
                setTimeout(() => {
                  setAnimState("fadingOut");
                  setIsFadingOut(true);
                  setAuthSuccess(true);

                  setTimeout(() => {
                    setShowCard(false);
                    setIsFadingIn(true);

                    // Navigate based on role
                    setTimeout(() => {
                      if (res.role === "admin") {
                        navigate("/admin");
                      } else {
                        navigate("/student");
                      }
                    }, 600);
                  }, 600);
                }, 800);
              }, 600);
            }, 400);
          } catch (err) {
            console.error(err);
            // Failed login animation
            setAnimState("denied");
            setLockState("denied");

            setTimeout(() => {
              setKeyState("removing");
              setTimeout(() => {
                setShowKey(false);
                setLockState("idle");
                setAnimState("idle");
                setLoading(false);
                setError("Login Failed. Please try again.");
                setKeyState("idle");
              }, 500);
            }, 400);
          }
        };

        performLogin();
      }, 600); // Key slides for 600ms
    }, 300); // Button morphs for 300ms
  };

  // Handle rollback trigger "kk1"
  const handleKeyDown = (e) => {
    if (e.key === "k" && e.ctrlKey) {
      // Check for kk1 via input combination
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, y: -30, transition: { duration: 0.6, ease: "easeIn" } },
  };

const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03, boxShadow: "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.2)" },
    tap: { scale: 0.98 },
    loading: { scale: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      {showCard ? (
        <motion.div
          key="login-page"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInVariants}
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
background: "#1E1B4B",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
          }}
        >
          {/* Background gradients */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "60%",
              height: "60%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "-10%",
              width: "60%",
              height: "60%",
background:
                "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "80%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating soft dots grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* Center Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Rotating Ring around the card */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <RotatingRing size={520} strokeWidth={2} />
            </div>

            {/* Login Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isFadingOut ? "exit" : "visible"}
              style={{
                width: 420,
                maxWidth: "90vw",
                background: "rgba(30,41,59,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "48px 40px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(139,92,246,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card top glow */}
              <div
                style={{
                  position: "absolute",
                  top: -80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Lock Icon */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 28,
                  position: "relative",
                }}
              >
                {showKey && (
                  <div style={{ position: "absolute", right: "calc(50% - 60px)", top: 4 }}>
                    <AnimatedKey state={keyState} />
                  </div>
                )}
                <AnimatedLock state={lockState} />
              </div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ textAlign: "center", marginBottom: 8 }}
              >
                {showSuccess ? (
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <div style={{ color: "#10B981", fontSize: "1rem", fontWeight: 600 }}>
                        {showSuccess}
                      </div>
                      <div style={{ color: "#94A3B8", fontSize: "0.85rem", marginTop: 4 }}>
                        Redirecting...
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <h1
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        color: "#F8FAFC",
                        letterSpacing: "-0.5px",
                        marginBottom: 4,
                      }}
                    >
                      Welcome Back
                    </h1>
                    <p style={{ color: "#94A3B8", fontSize: "0.9rem", fontWeight: 400 }}>
                      Sign in to continue
                    </p>
                  </>
                )}
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#EF4444",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "#FCA5A5", fontSize: "0.85rem" }}>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "#94A3B8",
                      marginBottom: 6,
                      letterSpacing: "0.3px",
                    }}
                  >
                    Username
                  </label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <User
                      size={16}
                      style={{
                        position: "absolute",
                        left: 14,
                        color: animState !== "idle" ? "#4B5563" : "#64748B",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />
                    <input
                      ref={emailRef}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your username"
                      disabled={animState !== "idle"}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 40px",
                        background: animState !== "idle" ? "#111827" : "#1E293B",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        color: "#F8FAFC",
                        fontSize: "0.9rem",
                        fontFamily: "'Poppins', sans-serif",
                        outline: "none",
                        transition: "all 0.2s ease",
                        opacity: animState !== "idle" ? 0.5 : 1,
                        cursor: animState !== "idle" ? "not-allowed" : "text",
                      }}
                      onFocus={(e) => {
                        if (animState === "idle") {
                          e.target.style.borderColor = "rgba(139,92,246,0.5)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
                        }
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "#94A3B8",
                      marginBottom: 6,
                      letterSpacing: "0.3px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <Lock
                      size={16}
                      style={{
                        position: "absolute",
                        left: 14,
                        color: animState !== "idle" ? "#4B5563" : "#64748B",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={animState !== "idle"}
                      style={{
                        width: "100%",
                        padding: "12px 44px 12px 40px",
                        background: animState !== "idle" ? "#111827" : "#1E293B",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        color: "#F8FAFC",
                        fontSize: "0.9rem",
                        fontFamily: "'Poppins', sans-serif",
                        outline: "none",
                        transition: "all 0.2s ease",
                        opacity: animState !== "idle" ? 0.5 : 1,
                        cursor: animState !== "idle" ? "not-allowed" : "text",
                      }}
                      onFocus={(e) => {
                        if (animState === "idle") {
                          e.target.style.borderColor = "rgba(139,92,246,0.5)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
                        }
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={animState !== "idle"}
                      style={{
                        position: "absolute",
                        right: 10,
                        background: "none",
                        border: "none",
                        cursor: animState !== "idle" ? "not-allowed" : "pointer",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748B",
                        opacity: animState !== "idle" ? 0.4 : 1,
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 24,
                    marginTop: 4,
                  }}
                >
                  <Link
    to="/forgot-password"
    style={{
        color: animState !== "idle" ? "#4B5563" : "#8B5CF6",
        fontSize: "0.8rem",
        fontWeight: 500,
        textDecoration: "none",
        opacity: animState !== "idle" ? 0.4 : 1,
        pointerEvents: animState !== "idle" ? "none" : "auto",
    }}
>
    Forgot Password?
</Link>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={animState !== "idle" && animState !== "signing" && animState !== "denied" ? true : false}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover={animState === "idle" ? "hover" : ""}
                  whileTap={animState === "idle" ? "tap" : ""}
                  animate={
                    animState === "signing" || animState !== "idle" ? "loading" : "idle"
                  }
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    background: "#8B5CF6",
                    border: "none",
                    borderRadius: 14,
                    color: "#0F172A",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    cursor:
                      animState !== "idle" && animState !== "signing" && animState !== "denied"
                        ? "not-allowed"
                        : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    position: "relative",
                    overflow: "hidden",
                    opacity:
                      animState !== "idle" && animState !== "signing" && animState !== "denied"
                        ? 0.5
                        : 1,
                    transition: "box-shadow 0.3s ease, transform 0.2s ease",
                    boxShadow:
                      animState === "idle"
                        ? "0 4px 15px rgba(139,92,246,0.3)"
                        : "0 4px 15px rgba(139,92,246,0.15)",
                  }}
                >
                  {/* Ripple effect background */}
                  {animState === "idle" && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {(animState === "signing" || animState === "keyEntering" || animState === "keyInserted" || animState === "keyTurning" || animState === "unlocking") && !showSuccess ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 size={18} />
                      </motion.div>
                      <span style={{ fontWeight: 500, position: "relative", zIndex: 1 }}>
                        Signing In...
                      </span>
                    </>
                  ) : animState === "granted" || animState === "fadingOut" ? (
                    <span style={{ fontWeight: 500, position: "relative", zIndex: 1 }}>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ✓ Completed
                      </motion.span>
                    </span>
                  ) : animState === "denied" ? (
                    <span style={{ fontWeight: 500, position: "relative", zIndex: 1, color: "#94A3B8" }}>
                      Failed
                    </span>
                  ) : (
                    <>
                      <span style={{ fontWeight: 500, position: "relative", zIndex: 1 }}>
                        Sign In
                      </span>
                      <ArrowRight size={18} style={{ position: "relative", zIndex: 1 }} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: "0.75rem",
                  color: "#4B5563",
                }}
              >
                Hostel Management System v2.0
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom left branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: 24,
              left: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#8B5CF6",
                boxShadow: "0 0 10px rgba(139,92,246,0.4)",
              }}
            />
            <span style={{ color: "#4B5563", fontSize: "0.75rem", letterSpacing: "0.5px" }}>
              HMS · SECURE LOGIN
            </span>
          </motion.div>
        </motion.div>
      ) : (
        /* Dashboard fade in */
        <motion.div
          key="dashboard-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            minHeight: "100vh",
            background: "#0F172A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              width: 40,
              height: 40,
              border: "2px solid rgba(139,92,246,0.1)",
              borderTopColor: "#8B5CF6",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Login;



