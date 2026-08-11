import { useState, useRef } from "react";
import { motion } from "framer-motion";

const RippleButton = ({
  children,
  onClick,
  style,
  disabled = false,
  type = "button",
  className,
}) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  let rippleId = 0;

  const handleClick = (e) => {
    if (disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const id = ++rippleId;
    const newRipple = { x, y, size, id };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      className={className}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            opacity: 0.5,
          }}
          animate={{
            width: ripple.size,
            height: ripple.size,
            x: ripple.x - ripple.size / 2,
            y: ripple.y - ripple.size / 2,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;

