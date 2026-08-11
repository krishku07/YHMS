import { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, IconButton, Snackbar, Alert, Paper, Grid, Chip,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pencil, Trash2, IdCard, Search, Users, UserCheck, Briefcase, UserPlus } from "lucide-react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../../api/employeeApi";
import PageHero from "../../components/PageHero";
import {
  inputBase,
  primaryButton,
  secondaryButton,
  dialogCard,
  dialogTitle,
  dialogContent,
  dialogActions,
  formGridSpacing,
} from "../../styles/formStyles";
import {
  dataGridPaper,
  dataGridStyles,
} from "../../styles/dataGridStyles";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState({ name: "", designation: "", mobile: "", email: "", status: "Active" });

  useEffect(() => { loadEmployees(); }, []);
  useEffect(() => {
    const data = employees.filter((e) =>
      (e.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.designation || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.mobile || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(data);
  }, [search, employees]);

  const loadEmployees = async () => {
    try { const data = await getEmployees(); setEmployees(data); setFilteredEmployees(data); }
    catch (error) { console.log(error); }
  };

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });
  const clearForm = () => { setEmployee({ name: "", designation: "", mobile: "", email: "", status: "Active" }); setEditing(false); setSelectedId(null); };

  const saveEmployee = async () => {
    try {
      if (editing) { await updateEmployee(selectedId, employee); setMessage("Employee Updated Successfully"); }
      else { await addEmployee(employee); setMessage("Employee Added Successfully"); }
      setSnackbar(true); setOpen(false); clearForm(); loadEmployees();
    } catch (error) { console.log(error); }
  };

  const editEmployee = (row) => { setEmployee(row); setSelectedId(row.id); setEditing(true); setOpen(true); };
  const removeEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try { await deleteEmployee(id); setMessage("Employee Deleted Successfully"); setSnackbar(true); loadEmployees(); }
    catch (error) { console.log(error); }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1.2 },
    { field: "designation", headerName: "Designation", flex: 1.2 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.4 },
    { field: "status", headerName: "Status", width: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === "Active" ? "success" : "error"} size="small" sx={{ fontWeight: 600, borderRadius: "6px", fontSize: "0.75rem" }} />
    )},
    { field: "action", headerName: "Action", width: 130, sortable: false, renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton onClick={() => editEmployee(params.row)} sx={{ color: "#6D28D9", "&:hover": { bgcolor: "rgba(139,92,246,0.1)" } }}><Pencil size={18} /></IconButton>
        <IconButton onClick={() => removeEmployee(params.row.id)} sx={{ color: "#EF4444", "&:hover": { bgcolor: "rgba(239,68,68,0.1)" } }}><Trash2 size={18} /></IconButton>
      </Box>
    )},
  ];

  return (
<Box>
      {/* Hero Section */}
      <PageHero
        icon={<IdCard size={26} />}
        title="Employee Management"
        subtitle="Manage all hostel employees from one place."
        actionLabel="Add Employee"
        actionIcon={<UserPlus size={18} />}
        onAction={() => { clearForm(); setOpen(true); }}
        accent="#10B981"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Employees", value: employees.length, color: "#10B981", icon: <Users size={20} /> },
          { label: "Active Employees", value: employees.filter(e => e.status === "Active").length, color: "#10B981", icon: <UserCheck size={20} /> },
          { label: "Designations", value: new Set(employees.map(e => e.designation)).size, color: "#6D28D9", icon: <Briefcase size={20} /> },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
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

      <TextField fullWidth placeholder="Search Employee..." value={search} onChange={(e) => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94A3B8" }} />, sx: { color: "#0F172A" } } }}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0" } }}
      />

      <Paper sx={dataGridPaper}>
        <DataGrid rows={filteredEmployees} columns={columns} pageSizeOptions={[5,10,20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} slots={{ toolbar: GridToolbar }}
          sx={dataGridStyles}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"
        PaperProps={{ sx: dialogCard }}>
        <DialogTitle sx={dialogTitle}>{editing ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent sx={dialogContent}>
          <Grid container sx={{ ...formGridSpacing }}>
            {["name", "designation", "mobile", "email", "status"].map((field) => (
              <Grid size={{ xs: 12 }} key={field}>
                <TextField fullWidth label={field.charAt(0).toUpperCase() + field.slice(1)} name={field} value={employee[field]} onChange={handleChange}
                  sx={inputBase}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button onClick={() => setOpen(false)} sx={secondaryButton}>Cancel</Button>
          <Button variant="contained" onClick={saveEmployee} sx={primaryButton}>
            {editing ? "Update Employee" : "Save Employee"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default EmployeePage;


