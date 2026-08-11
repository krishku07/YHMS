import { useEffect, useState, useMemo } from "react";
import { Box, Paper, Typography, Button, TextField, Snackbar, Alert, Chip, Tooltip, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllOutpasses, approveOutpass, rejectOutpass, deleteOutpass } from "../../api/outpassApi";
import { FileText, Search, CheckCircle2, XCircle, Trash2, Clock, UserCheck, AlertTriangle } from "lucide-react";
import {
  dataGridPaper,
  dataGridStyles,
} from "../../styles/dataGridStyles";
import PageHero from "../../components/PageHero";

function OutpassPage() {
  const [outpasses, setOutpasses] = useState([]);
  const [filteredOutpasses, setFilteredOutpasses] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);

useEffect(() => { loadOutpasses(); }, []);
  useEffect(() => { setFilteredOutpasses(outpasses.filter(o => (o.name || "").toLowerCase().includes(search.toLowerCase()))); }, [search, outpasses]);

  const loadOutpasses = async () => {
    try {
      const data = await getAllOutpasses();
      setOutpasses(data);
      setFilteredOutpasses(data);
    } catch (error) {
      console.log(error);
      setMessage("Failed to load outpass requests");
      setSnackbar(true);
    }
  };
  const approve = async (id) => {
    try {
      await approveOutpass(id);
      setMessage("Request Approved");
      setSnackbar(true);
      loadOutpasses();
    } catch (error) {
      console.log(error);
      setMessage("Failed to approve request");
      setSnackbar(true);
    }
  };
  const reject = async (id) => {
    try {
      await rejectOutpass(id);
      setMessage("Request Rejected");
      setSnackbar(true);
      loadOutpasses();
    } catch (error) {
      console.log(error);
      setMessage("Failed to reject request");
      setSnackbar(true);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await deleteOutpass(id);
      setMessage("Request Deleted");
      setSnackbar(true);
      loadOutpasses();
    } catch (error) {
      console.log(error);
      setMessage("Failed to delete request");
      setSnackbar(true);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved": return { bg: "#10B981", chip: "success" };
      case "Rejected": return { bg: "#EF4444", chip: "error" };
      default: return { bg: "#F59E0B", chip: "warning" };
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 2 },
    { field: "leaveDate", headerName: "Leave Date", width: 130 },
    { field: "returnDate", headerName: "Return Date", width: 130 },
    { field: "status", headerName: "Status", width: 140, renderCell: (params) => {
      const colors = statusColor(params.value);
      return (
        <Chip label={params.value} color={colors.chip} size="small"
          icon={params.value === "Approved" ? <CheckCircle2 size={14} /> : params.value === "Rejected" ? <XCircle size={14} /> : <Clock size={14} />}
          sx={{ fontWeight: 600, borderRadius: "8px", fontSize: "0.75rem" }}
        />
      );
    }},
    { field: "actions", headerName: "Actions", width: 300, sortable: false, renderCell: (params) => {
      const status = params.row.status;
      const isApproved = status === "Approved";
      const isRejected = status === "Rejected";
      const isFinalized = isApproved || isRejected;
      return (
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Tooltip title={isApproved ? "Already Approved" : isRejected ? "Already Rejected" : "Approve Request"}>
            <span>
              <Button size="small" variant="contained" disabled={isFinalized} onClick={() => approve(params.row.id)}
                sx={{ minWidth: 80, bgcolor: isApproved ? "rgba(34,197,94,0.15)" : "#10B981", color: isApproved ? "#10B981" : "#fff", fontWeight: 600, textTransform: "none", fontSize: "0.75rem", borderRadius: "8px", opacity: isApproved ? 0.6 : isRejected ? 0.3 : 1, boxShadow: isFinalized ? "none" : "0 2px 8px rgba(34,197,94,0.3)", "&:hover": isFinalized ? {} : { bgcolor: "#16A34A" }, "&.Mui-disabled": { bgcolor: isApproved ? "rgba(34,197,94,0.08)" : isRejected ? "rgba(239,68,68,0.08)" : undefined, color: isApproved ? "#10B981" : isRejected ? "#94A3B8" : undefined } }}
                startIcon={isApproved ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              >{isApproved ? "Approved" : "Approve"}</Button>
            </span>
          </Tooltip>
          <Tooltip title={isRejected ? "Already Rejected" : isApproved ? "Already Approved" : "Reject Request"}>
            <span>
              <Button size="small" variant="contained" disabled={isFinalized} onClick={() => reject(params.row.id)}
                sx={{ minWidth: 72, bgcolor: isRejected ? "rgba(239,68,68,0.15)" : "#EF4444", color: isRejected ? "#EF4444" : "#fff", fontWeight: 600, textTransform: "none", fontSize: "0.75rem", borderRadius: "8px", opacity: isRejected ? 0.6 : isApproved ? 0.3 : 1, boxShadow: isFinalized ? "none" : "0 2px 8px rgba(239,68,68,0.3)", "&:hover": isFinalized ? {} : { bgcolor: "#DC2626" }, "&.Mui-disabled": { bgcolor: isRejected ? "rgba(239,68,68,0.08)" : isApproved ? "rgba(34,197,94,0.08)" : undefined, color: isRejected ? "#EF4444" : isApproved ? "#94A3B8" : undefined } }}
                startIcon={<XCircle size={14} />}
              >{isRejected ? "Rejected" : "Reject"}</Button>
            </span>
          </Tooltip>
          <Button size="small" variant="outlined" onClick={() => remove(params.row.id)}
            sx={{ minWidth: 60, color: "#64748B", borderColor: "#CBD5E1", fontWeight: 500, textTransform: "none", fontSize: "0.75rem", borderRadius: "8px", "&:hover": { borderColor: "#EF4444", color: "#EF4444", bgcolor: "rgba(239,68,68,0.04)" } }}
            startIcon={<Trash2 size={14} />}
          >Delete</Button>
        </Box>
      );
    }},
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<FileText size={26} />}
        title="Outpass Management"
        subtitle="Manage and approve student outpass requests."
        accent="#EC4899"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Requests", value: outpasses.length, color: "#EC4899", icon: <FileText size={20} /> },
          { label: "Pending", value: outpasses.filter(o => o.status === "Pending").length, color: "#F59E0B", icon: <Clock size={20} /> },
          { label: "Approved", value: outpasses.filter(o => o.status === "Approved").length, color: "#10B981", icon: <CheckCircle2 size={20} /> },
          { label: "Rejected", value: outpasses.filter(o => o.status === "Rejected").length, color: "#EF4444", icon: <XCircle size={20} /> },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 3 }} key={i}>
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

      <TextField fullWidth placeholder="Search Student..." value={search} onChange={(e) => setSearch(e.target.value)}
        slotProps={{ input: { startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94A3B8" }} />, sx: { color: "#0F172A" } } }}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0" } }}
      />

<Paper sx={dataGridPaper}>
        <DataGrid rows={filteredOutpasses} columns={columns} pageSizeOptions={[5,10,20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} slots={{ toolbar: GridToolbar }}
          sx={dataGridStyles}
        />
      </Paper>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default OutpassPage;


