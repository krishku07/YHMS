import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CreditCard, Search, Plus, DollarSign, Receipt, Pencil, Trash2 } from "lucide-react";
import { getFees, addFee, updateFee, deleteFee } from "../../api/feeApi";
import {
  inputBase,
  selectBase,
  primaryButton,
  secondaryButton,
  dialogCard,
  dialogTitle,
  dialogContent,
  dialogActions,
  formGridSpacing,
  inputLabel as formInputLabel,
  selectMenuPaper,
  menuItem,
} from "../../styles/formStyles";
import {
  dataGridPaper,
  dataGridStyles,
} from "../../styles/dataGridStyles";
import PageHero from "../../components/PageHero";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function FeePage() {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [fee, setFee] = useState({ studentId: "", month: "", amount: "" });

  useEffect(() => { loadFees(); }, []);
  useEffect(() => { setFilteredFees(fees.filter(f => String(f.studentId).toLowerCase().includes(search.toLowerCase()))); }, [fees, search]);

  const loadFees = async () => { const data = await getFees(); setFees(data); setFilteredFees(data); };
  const handleChange = (e) => setFee({ ...fee, [e.target.name]: e.target.value });
  const clearForm = () => { setFee({ studentId: "", month: "", amount: "" }); setEditing(false); setSelectedId(null); };

  const saveFee = async () => {
    if (editing) { await updateFee(selectedId, fee); setMessage("Fee Updated Successfully"); }
    else { await addFee(fee); setMessage("Fee Added Successfully"); }
    setSnackbar(true); setOpen(false); clearForm(); loadFees();
  };

  const editFee = (row) => { setFee(row); setSelectedId(row.id); setEditing(true); setOpen(true); };
  const removeFee = async (id) => {
    if (!window.confirm("Delete this fee record?")) return;
    await deleteFee(id); setMessage("Fee Deleted Successfully"); setSnackbar(true); loadFees();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "studentId", headerName: "Student ID", width: 140 },
    { field: "month", headerName: "Month", flex: 1 },
    { field: "amount", headerName: "Amount (₹)", width: 150, renderCell: (params) => (
      <Typography fontWeight={600} sx={{ color: "#10B981" }}>₹{params.value}</Typography>
    )},
{ field: "actions", headerName: "Actions", width: 120, sortable: false, renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => editFee(params.row)}
            sx={{
              color: "#6D28D9",
              bgcolor: "rgba(109,40,217,0.1)",
              borderRadius: "8px",
              transition: "all 0.2s",
              "&:hover": { bgcolor: "#6D28D9", color: "#FFFFFF" },
            }}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => removeFee(params.row.id)}
            sx={{
              color: "#EF4444",
              bgcolor: "rgba(239,68,68,0.1)",
              borderRadius: "8px",
              transition: "all 0.2s",
              "&:hover": { bgcolor: "#EF4444", color: "#FFFFFF" },
            }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </Box>
    )},
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<CreditCard size={26} />}
        title="Fee Management"
        subtitle="Manage hostel fee records from one place."
        actionLabel="Add Fee"
        actionIcon={<Plus size={18} />}
        onAction={() => { clearForm(); setOpen(true); }}
        accent="#F59E0B"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Records", value: fees.length, color: "#F59E0B", icon: <Receipt size={20} /> },
          { label: "Total Collected", value: `₹${fees.reduce((s, f) => s + f.amount, 0)}`, color: "#10B981", icon: <DollarSign size={20} /> },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Paper sx={{ p: 3, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography sx={{ color: "#64748B", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</Typography>
                  <Typography variant="h4" fontWeight="700" sx={{ color: "#0F172A", mt: 0.5 }}>{stat.value}</Typography>
                </Box>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: `${stat.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TextField fullWidth placeholder="Search Student ID..." value={search} onChange={(e) => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94A3B8" }} />, sx: { color: "#0F172A" } } }}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0" } }}
      />

      <Paper sx={dataGridPaper}>
        <DataGrid rows={filteredFees} columns={columns} pageSizeOptions={[5,10,20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} slots={{ toolbar: GridToolbar }}
          sx={dataGridStyles}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"
        PaperProps={{ sx: dialogCard }}>
        <DialogTitle sx={dialogTitle}>{editing ? "Edit Fee" : "Add Fee"}</DialogTitle>
        <DialogContent sx={dialogContent}>
          <Grid container sx={{ ...formGridSpacing }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Student ID" name="studentId" value={fee.studentId} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth sx={selectBase}>
                <InputLabel sx={formInputLabel}>Month</InputLabel>
                <Select name="month" value={fee.month} label="Month" onChange={handleChange}
                  MenuProps={{ PaperProps: { sx: selectMenuPaper } }}
                >
                  {months.map((m) => <MenuItem key={m} value={m} sx={menuItem}>{m}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Amount" name="amount" type="number" value={fee.amount} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button onClick={() => setOpen(false)} sx={secondaryButton}>Cancel</Button>
          <Button variant="contained" onClick={saveFee} sx={primaryButton}>
            {editing ? "Update Fee" : "Save Fee"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default FeePage;


