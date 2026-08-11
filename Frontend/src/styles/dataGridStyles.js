/**
 * Shared DataGrid Styles for Admin & Student Tables
 * Modern Light Theme — sticky headers, zebra rows, row hover, rounded corners
 */

export const dataGridPaper = {
  height: 600,
  borderRadius: "16px",
  overflow: "hidden",
  bgcolor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
};

export const dataGridStyles = {
  color: "#0F172A",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  borderRadius: "16px",
  // Header styling — sticky, uppercase
  "& .MuiDataGrid-columnHeaders": {
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#0F172A",
    bgcolor: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
    minHeight: "56px !important",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  // Cell styling
  "& .MuiDataGrid-cell": {
    fontSize: "14px",
    fontWeight: 500,
    color: "#0F172A",
    borderColor: "#F1F5F9",
    padding: "8px 16px",
    "&:focus": { outline: "none" },
    "&:focus-within": { outline: "none" },
  },
  // Row styling — zebra + hover
  "& .MuiDataGrid-row": {
    transition: "background-color 0.15s ease",
    "&:hover": {
      bgcolor: "#F5F3FF !important",
    },
    "&:nth-of-type(even)": {
      bgcolor: "#FAFBFC",
      "&:hover": {
        bgcolor: "#F5F3FF !important",
      },
    },
  },
  // Footer styling
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #E2E8F0",
    bgcolor: "#FFFFFF",
  },
  "& .MuiTablePagination-root": {
    color: "#64748B",
    fontSize: "0.85rem",
  },
  "& .MuiTablePagination-selectIcon": {
    color: "#64748B",
  },
  // Toolbar
  "& .MuiDataGrid-toolbarContainer": {
    p: 1.5,
    gap: 1,
    bgcolor: "#FFFFFF",
    borderBottom: "1px solid #E2E8F0",
  },
  "& .MuiButton-root": {
    color: "#6D28D9",
    fontWeight: 600,
    fontSize: "0.8rem",
    textTransform: "none",
  },
  "& .MuiTextField-root": {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#FFFFFF",
      borderRadius: "8px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E2E8F0",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6D28D9",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6D28D9",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      color: "#64748B",
      "&.Mui-focused": { color: "#6D28D9" },
    },
  },
  // Checkbox
  "& .MuiCheckbox-root": {
    color: "#94A3B8",
    "&.Mui-checked": {
      color: "#6D28D9",
    },
  },
  // Sort icons
  "& .MuiDataGrid-sortIcon": {
    color: "#94A3B8",
  },
  // Column separator
  "& .MuiDataGrid-columnSeparator": {
    color: "#E2E8F0",
  },
  // Menu
  "& .MuiMenu-paper": {
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
  },
};

// Custom renderCell for primary text
export const primaryCell = {
  color: "#0F172A",
  fontWeight: 600,
  fontSize: "14px",
};

// Custom renderCell for secondary text
export const secondaryCell = {
  color: "#64748B",
  fontWeight: 500,
  fontSize: "14px",
};

// Status Chip styles — colored soft badges
export const statusChip = {
  active: {
    bgcolor: "rgba(16,185,129,0.15)",
    color: "#10B981",
    fontWeight: 600,
    borderRadius: "8px",
    fontSize: "0.75rem",
    border: "1px solid rgba(16,185,129,0.3)",
  },
  inactive: {
    bgcolor: "rgba(239,68,68,0.15)",
    color: "#EF4444",
    fontWeight: 600,
    borderRadius: "8px",
    fontSize: "0.75rem",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  pending: {
    bgcolor: "rgba(245,158,11,0.15)",
    color: "#F59E0B",
    fontWeight: 600,
    borderRadius: "8px",
    fontSize: "0.75rem",
    border: "1px solid rgba(245,158,11,0.3)",
  },
  info: {
    bgcolor: "rgba(109,40,217,0.15)",
    color: "#6D28D9",
    fontWeight: 600,
    borderRadius: "8px",
    fontSize: "0.75rem",
    border: "1px solid rgba(109,40,217,0.3)",
  },
};
