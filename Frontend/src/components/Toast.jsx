import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

const icons = {
  success: <CheckCircle2 size={18} color="#10B981" />,
  error: <AlertCircle size={18} color="#EF4444" />,
  warning: <AlertTriangle size={18} color="#F59E0B" />,
info: <Info size={18} color="#6D28D9" />,
};

const Toast = ({ id, message, type = "info", duration = 4000, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
          onAnimationComplete={() => {
            if (!isVisible) {
              setTimeout(() => onRemove(id), 300);
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            marginBottom: 8,
            minWidth: 300,
            maxWidth: 420,
          }}
        >
          {icons[type] || icons.info}
<span style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 500, flex: 1 }}>
            {message}
          </span>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              cursor: "pointer",
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.target.style.background = "none")}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Manager Hook
let toastId = 0;
const listeners = new Set();
let toasts = [];

const notify = (message, type = "info", duration = 4000) => {
  const id = ++toastId;
  toasts = [...toasts, { id, message, type, duration }];
  listeners.forEach((listener) => listener(toasts));
  return id;
};

const removeToast = (id) => {
  toasts = toasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(toasts));
};

export const toast = {
  success: (msg, duration) => notify(msg, "success", duration),
  error: (msg, duration) => notify(msg, "error", duration),
  warning: (msg, duration) => notify(msg, "warning", duration),
  info: (msg, duration) => notify(msg, "info", duration),
};

// Toast Container
export const ToastContainer = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handler = (newToasts) => setItems([...newToasts]);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 24,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "auto",
      }}
    >
      <AnimatePresence>
        {items.map((t) => (
          <Toast key={t.id} {...t} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;


