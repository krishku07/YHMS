import { useEffect, useState } from "react";
import {
  Box, Paper, Typography, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Grid, Chip, IconButton,
  FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Home, Search, Pencil, Trash2, Building2, CheckCircle2, AlertTriangle, XCircle, Wrench, Plus } from "lucide-react";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../../api/roomApi";
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
  primaryCell,
  secondaryCell,
  statusChip,
} from "../../styles/dataGridStyles";
import PageHero from "../../components/PageHero";

function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState({ roomNumber: "", roomType: "", capacity: "", occupied: 0, status: "Available" });

  useEffect(() => { loadRooms(); }, []);
  useEffect(() => {
    setFilteredRooms(rooms.filter((r) => r.roomNumber.toLowerCase().includes(search.toLowerCase())));
  }, [rooms, search]);

  const loadRooms = async () => { const data = await getRooms(); setRooms(data); setFilteredRooms(data); };
  const handleChange = (e) => setRoom({ ...room, [e.target.name]: e.target.value });
  const clearForm = () => { setRoom({ roomNumber: "", roomType: "", capacity: "", occupied: 0, status: "Available" }); setEditing(false); setSelectedId(null); };

  const saveRoom = async () => {
    if (editing) { await updateRoom(selectedId, room); setMessage("Room Updated Successfully"); }
    else { await addRoom(room); setMessage("Room Added Successfully"); }
    setSnackbar(true); setOpen(false); clearForm(); loadRooms();
  };

  const editRoom = (row) => { setRoom(row); setSelectedId(row.id); setEditing(true); setOpen(true); };
  const removeRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await deleteRoom(id); setMessage("Room Deleted Successfully"); setSnackbar(true); loadRooms();
  };

  const statusColor = (status) => {
    switch (status) {
      case "Available": return "#10B981";
      case "Partially Filled": return "#F59E0B";
      case "Full": return "#EF4444";
      case "Maintenance": return "#3B82F6";
      default: return "#94A3B8";
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "Available": return <CheckCircle2 size={14} />;
      case "Partially Filled": return <AlertTriangle size={14} />;
      case "Full": return <XCircle size={14} />;
      case "Maintenance": return <Wrench size={14} />;
      default: return null;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "roomNumber", headerName: "Room", width: 120 },
    { field: "roomType", headerName: "Type", flex: 1 },
    { field: "capacity", headerName: "Capacity", width: 100 },
    { field: "occupied", headerName: "Occupied", width: 100 },
    {
      field: "status", headerName: "Status", width: 160,
      renderCell: (params) => (
        <Chip
          icon={<StatusIcon status={params.value} />}
          label={params.value}
          size="small"
          sx={{
            fontWeight: 600, borderRadius: "8px", fontSize: "0.75rem",
            bgcolor: `${statusColor(params.value)}18`,
            color: statusColor(params.value),
            border: `1px solid ${statusColor(params.value)}33`,
          }}
        />
      ),
    },
    {
      field: "action", headerName: "Action", width: 130, sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
<IconButton onClick={() => editRoom(params.row)} sx={{ color: "#6D28D9", "&:hover": { bgcolor: "rgba(139,92,246,0.1)" } }}><Pencil size={18} /></IconButton>
          <IconButton onClick={() => removeRoom(params.row.id)} sx={{ color: "#EF4444", "&:hover": { bgcolor: "rgba(239,68,68,0.1)" } }}><Trash2 size={18} /></IconButton>
        </Box>
      ),
    },
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<Home size={26} />}
        title="Room Management"
        subtitle="Add, update and manage hostel rooms."
        actionLabel="Add Room"
        actionIcon={<Plus size={18} />}
        onAction={() => { clearForm(); setOpen(true); }}
        accent="#6D28D9"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Rooms", value: rooms.length, color: "#6D28D9", icon: <Building2 size={20} /> },
          { label: "Available", value: rooms.filter(r => r.status === "Available").length, color: "#10B981", icon: <CheckCircle2 size={20} /> },
          { label: "Occupied", value: rooms.filter(r => r.status === "Full" || r.status === "Partially Filled").length, color: "#EF4444", icon: <XCircle size={20} /> },
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

      {/* Room Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {filteredRooms.slice(0, 4).map((r) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={r.id}>
            <Paper sx={{
              p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF",
              border: `1px solid ${statusColor(r.status)}44`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              transition: "all 0.25s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: `0 10px 40px rgba(0,0,0,0.08)`, borderColor: `${statusColor(r.status)}` },
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1.1rem" }}>Room {r.roomNumber}</Typography>
                <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: `${statusColor(r.status)}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Home size={18} style={{ color: statusColor(r.status) }} />
                </Box>
              </Box>
              <Chip icon={<StatusIcon status={r.status} />} label={r.status} size="small"
                sx={{ fontWeight: 600, borderRadius: "8px", fontSize: "0.7rem", bgcolor: `${statusColor(r.status)}12`, color: statusColor(r.status), mb: 1.5 }}
              />
              <Grid container spacing={1}>
                <Grid size={6}><Typography sx={{ color: "#64748B", fontSize: "0.7rem" }}>Type</Typography><Typography sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.85rem" }}>{r.roomType}</Typography></Grid>
                <Grid size={6}><Typography sx={{ color: "#64748B", fontSize: "0.7rem" }}>Capacity</Typography><Typography sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.85rem" }}>{r.capacity}</Typography></Grid>
                <Grid size={6}><Typography sx={{ color: "#64748B", fontSize: "0.7rem" }}>Occupied</Typography><Typography sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.85rem" }}>{r.occupied}</Typography></Grid>
                <Grid size={6}><Typography sx={{ color: "#64748B", fontSize: "0.7rem" }}>Available</Typography><Typography sx={{ color: "#10B981", fontWeight: 600, fontSize: "0.85rem" }}>{r.capacity - r.occupied}</Typography></Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TextField fullWidth placeholder="Search Room..." value={search} onChange={(e) => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94A3B8" }} />, sx: { color: "#0F172A" } } }}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0" } }}
      />

      <Paper sx={dataGridPaper}>
        <DataGrid rows={filteredRooms} columns={columns} pageSizeOptions={[5,10,20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} slots={{ toolbar: GridToolbar }}
          sx={dataGridStyles}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"
        PaperProps={{ sx: dialogCard }}>
        <DialogTitle sx={dialogTitle}>{editing ? "Edit Room" : "Add Room"}</DialogTitle>
        <DialogContent sx={dialogContent}>
          <Grid container sx={{ ...formGridSpacing }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Room Number" name="roomNumber" value={room.roomNumber} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth sx={selectBase}>
                <InputLabel sx={formInputLabel}>Room Type</InputLabel>
                <Select name="roomType" value={room.roomType} label="Room Type" onChange={handleChange}
                  MenuProps={{ PaperProps: { sx: selectMenuPaper } }}
                >
                  <MenuItem value="" sx={menuItem}>Select Type</MenuItem>
                  <MenuItem value="Single" sx={menuItem}>Single</MenuItem>
                  <MenuItem value="Double" sx={menuItem}>Double</MenuItem>
                  <MenuItem value="Triple" sx={menuItem}>Triple</MenuItem>
                  <MenuItem value="Dormitory" sx={menuItem}>Dormitory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Capacity" name="capacity" type="number" value={room.capacity} onChange={handleChange}
                sx={inputBase}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth sx={selectBase}>
                <InputLabel sx={formInputLabel}>Status</InputLabel>
                <Select name="status" value={room.status} label="Status" onChange={handleChange}
                  MenuProps={{ PaperProps: { sx: selectMenuPaper } }}
                >
                  <MenuItem value="Available" sx={menuItem}>Available</MenuItem>
                  <MenuItem value="Partially Filled" sx={menuItem}>Partially Filled</MenuItem>
                  <MenuItem value="Full" sx={menuItem}>Full</MenuItem>
                  <MenuItem value="Maintenance" sx={menuItem}>Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button onClick={() => setOpen(false)} sx={secondaryButton}>Cancel</Button>
          <Button variant="contained" onClick={saveRoom} sx={primaryButton}>
            {editing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default RoomPage;


