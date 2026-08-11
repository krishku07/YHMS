import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pencil, Trash2, User, Search, GraduationCap, Home, Users, UserCheck } from "lucide-react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../../api/studentApi";
import { getAvailableRooms } from "../../api/roomApi";
import {
  inputBase,
  selectBase,
  textAreaBase,
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

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const [student, setStudent] = useState({
    id: "", name: "", mobile: "", email: "",
    fatherName: "", motherName: "", permanentAddress: "",
    collegeName: "", aadhaarNumber: "", roomNumber: "", status: "Active",
  });

  useEffect(() => { loadStudents(); loadAvailableRooms(); }, []);

  useEffect(() => {
    const data = students.filter((s) =>
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.mobile || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.roomNumber || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(data);
  }, [students, search]);

  const loadStudents = async () => {
    try { const data = await getStudents(); setStudents(data); setFilteredStudents(data); }
    catch (error) { console.log(error); }
  };

  const loadAvailableRooms = async () => {
    try { const data = await getAvailableRooms(); setAvailableRooms(data); }
    catch (error) { console.log(error); }
  };

  const handleChange = (e) => setStudent({ ...student, [e.target.name]: e.target.value });

  const clearForm = () => {
    setStudent({ id: "", name: "", mobile: "", email: "", fatherName: "", motherName: "", permanentAddress: "", collegeName: "", aadhaarNumber: "", roomNumber: "", status: "Active" });
    setEditing(false); setSelectedId(null);
  };

  const saveStudent = async () => {
    try {
      if (editing) { await updateStudent(selectedId, student); setMessage("Student Updated Successfully"); }
      else { await addStudent(student); setMessage("Student Added Successfully"); }
      setSnackbar(true); setOpen(false); clearForm();
      await loadStudents(); await loadAvailableRooms();
    } catch (error) { console.log(error); }
  };

  const editStudent = (row) => { setStudent(row); setSelectedId(row.id); setEditing(true); setOpen(true); };

  const removeStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try { await deleteStudent(id); setMessage("Student Deleted Successfully"); setSnackbar(true); loadStudents(); }
    catch (error) { console.log(error); }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Student Name", flex: 1.3 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.4 },
    { field: "collegeName", headerName: "College", flex: 1.3 },
    { field: "roomNumber", headerName: "Room", width: 100 },
    {
      field: "status", headerName: "Status", width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "error"}
          size="small"
          sx={{ fontWeight: 600, borderRadius: "6px", fontSize: "0.75rem" }}
        />
      ),
    },
    {
      field: "action", headerName: "Action", width: 130, sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton onClick={() => editStudent(params.row)} sx={{ color: "#6D28D9", "&:hover": { bgcolor: "rgba(139,92,246,0.1)" } }}>
            <Pencil size={18} />
          </IconButton>
          <IconButton onClick={() => removeStudent(params.row.id)} sx={{ color: "#EF4444", "&:hover": { bgcolor: "rgba(239,68,68,0.1)" } }}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<User size={26} />}
        title="Student Management"
        subtitle="Manage all hostel students from one place."
        actionLabel="Add Student"
        actionIcon={<UserCheck size={18} />}
        onAction={() => { clearForm(); loadAvailableRooms(); setOpen(true); }}
        accent="#6D28D9"
      />

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Students", value: students.length, color: "#6D28D9", icon: <Users size={20} /> },
          { label: "Active Students", value: students.filter(s => s.status === "Active").length, color: "#10B981", icon: <UserCheck size={20} /> },
          { label: "Rooms Occupied", value: new Set(students.map(s => s.roomNumber)).size, color: "#6D28D9", icon: <Home size={20} /> },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Paper sx={{
              p: 3, borderRadius: "16px", bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography sx={{ color: "#64748B", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="700" sx={{ color: "#0F172A", mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{
                  width: 40, height: 40, borderRadius: "10px",
                  bgcolor: `${stat.color}12`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: stat.color,
                }}>{stat.icon}</Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      <TextField fullWidth placeholder="Search Student..." value={search} onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94A3B8" }} />,
            sx: { color: "#0F172A", "&::placeholder": { color: "#94A3B8" } },
          },
        }}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0" } }}
      />

{/* Data Grid */}
      <Paper sx={dataGridPaper}>
        <DataGrid
          rows={filteredStudents} columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          slots={{ toolbar: GridToolbar }}
          sx={dataGridStyles}
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md"
        PaperProps={{ sx: dialogCard }}>
        <DialogTitle sx={dialogTitle}>
          {editing ? "Edit Student" : "Add Student"}
        </DialogTitle>
        <DialogContent sx={dialogContent}>
          <Grid container sx={{ mt: 1, ...formGridSpacing }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Student ID" name="id" value={student.id} onChange={handleChange} disabled={editing}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Student Name" name="name" value={student.name} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Mobile" name="mobile" value={student.mobile} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Email" name="email" value={student.email} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Father Name" name="fatherName" value={student.fatherName} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Mother Name" name="motherName" value={student.motherName} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="College Name" name="collegeName" value={student.collegeName} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={selectBase}>
                <InputLabel sx={formInputLabel}>Room Number</InputLabel>
                <Select name="roomNumber" value={student.roomNumber} label="Room Number" onChange={handleChange}
                  MenuProps={{ PaperProps: { sx: selectMenuPaper } }}
                >
                  {availableRooms.map((room) => (
                    <MenuItem key={room.id} value={room.roomNumber} sx={menuItem}>
                      {room.roomNumber} ({room.capacity - room.occupied} Beds Left)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Permanent Address" name="permanentAddress" value={student.permanentAddress} onChange={handleChange} multiline rows={3}
                sx={textAreaBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Aadhaar Number" name="aadhaarNumber" value={student.aadhaarNumber} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Status" name="status" value={student.status} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button onClick={() => setOpen(false)} sx={secondaryButton}>Cancel</Button>
          <Button variant="contained" onClick={saveStudent} sx={primaryButton}>
            {editing ? "Update Student" : "Save Student"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default StudentPage;


