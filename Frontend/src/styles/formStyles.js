/**
 * Centralized Form Styles for Admin Forms
 * Professional Light Theme
 */

// Input field - base style applied to TextField and Select components
export const inputBase = {
  "& .MuiOutlinedInput-root": {
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 500,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CBD5E1",
      borderWidth: "1px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#94A3B8",
      borderWidth: "1px",
    },
"&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6D28D9",
        borderWidth: "2px",
      },
      boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.1)",
    },
    "&.Mui-disabled": {
      opacity: 0.6,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E2E8F0",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "#64748B",
    fontWeight: 500,
    fontSize: "0.875rem",
"&.Mui-focused": {
      color: "#6D28D9",
    },
    "&.Mui-disabled": {
      color: "#94A3B8",
    },
  },
  "& .MuiOutlinedInput-input": {
    "&::placeholder": {
      color: "#94A3B8",
      opacity: 1,
      fontWeight: 400,
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#94A3B8",
    fontSize: "0.75rem",
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #FFFFFF inset",
    WebkitTextFillColor: "#0F172A",
    borderRadius: "10px",
    caretColor: "#0F172A",
  },
};

// Select (Dropdown) specific styles
export const selectBase = {
  ...inputBase,
  "& .MuiOutlinedInput-root": {
    ...inputBase["& .MuiOutlinedInput-root"],
    "& .MuiSelect-icon": {
      color: "#94A3B8",
      fontSize: "1.5rem",
      transition: "color 0.2s ease",
    },
    "&:hover .MuiSelect-icon": {
      color: "#64748B",
    },
"&.Mui-focused .MuiSelect-icon": {
      color: "#6D28D9",
    },
  },
};

// TextArea (multiline) specific styles
export const textAreaBase = {
  ...inputBase,
  "& .MuiOutlinedInput-root": {
    ...inputBase["& .MuiOutlinedInput-root"],
    minHeight: "110px",
    alignItems: "flex-start",
    "& textarea": {
      resize: "none",
    },
  },
};

// Primary Action Button (Save, Add, Update, Send)
export const primaryButton = {
  background: "#6D28D9",
  color: "#FFFFFF",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  padding: "10px 28px",
  borderRadius: "10px",
  height: 44,
  boxShadow: "0 1px 3px rgba(109, 40, 217, 0.2)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "#5B21B6",
    boxShadow: "0 4px 12px rgba(109, 40, 217, 0.3)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
  "&.Mui-disabled": {
    background: "#E2E8F0",
    color: "#94A3B8",
    boxShadow: "none",
  },
};

// Success Button
export const successButton = {
  background: "#22C55E",
  color: "#FFFFFF",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  padding: "10px 28px",
  borderRadius: "10px",
  height: 44,
  "&:hover": {
    background: "#16A34A",
  },
};

// Danger Button
export const dangerButton = {
  background: "#EF4444",
  color: "#FFFFFF",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  padding: "10px 28px",
  borderRadius: "10px",
  height: 44,
  "&:hover": {
    background: "#DC2626",
  },
};

// Warning Button
export const warningButton = {
  background: "#F59E0B",
  color: "#FFFFFF",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  padding: "10px 28px",
  borderRadius: "10px",
  height: 44,
  "&:hover": {
    background: "#D97706",
  },
};

// Cancel / Secondary Button
export const secondaryButton = {
  color: "#64748B",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  padding: "10px 20px",
  borderRadius: "10px",
  height: 44,
  border: "1px solid #CBD5E1",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#F1F5F9",
    borderColor: "#94A3B8",
    color: "#0F172A",
  },
};

// Dialog Card / Paper
export const dialogCard = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
  padding: "0",
};

// Dialog Title
export const dialogTitle = {
  fontWeight: 700,
  fontSize: "1.25rem",
  color: "#0F172A",
  padding: "28px 32px 4px 32px",
  letterSpacing: "-0.3px",
};

// Dialog Content (grid container)
export const dialogContent = {
  padding: "16px 32px 8px 32px",
};

// Dialog Actions (footer)
export const dialogActions = {
  padding: "12px 32px 28px 32px",
  gap: "8px",
};

// Grid spacing
export const formGridSpacing = {
  rowSpacing: 3,
  columnSpacing: 2,
};

// MenuItem in Select dropdown
export const menuItem = {
  fontSize: "0.9rem",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#F1F5F9",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(139, 92, 246, 0.08) !important",
    "&:hover": {
      backgroundColor: "rgba(139, 92, 246, 0.12) !important",
    },
  },
};

// Select dropdown paper (menu list)
export const selectMenuPaper = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  border: "1px solid #E2E8F0",
  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  marginTop: "4px",
  "& .MuiMenuItem-root": menuItem,
};

// Input label specifically for FormControl (Select)
export const inputLabel = {
  color: "#64748B",
  fontWeight: 500,
  fontSize: "0.875rem",
  "&.Mui-focused": {
    color: "#6D28D9",
  },
};

