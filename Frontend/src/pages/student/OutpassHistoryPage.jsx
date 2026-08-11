import { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip, CircularProgress, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { History, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import { getStudentOutpasses } from "../../api/outpassApi";
import PageHero from "../../components/PageHero";
import { dataGridPaper, dataGridStyles } from "../../styles/dataGridStyles";

function OutpassHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadHistory(); }, []);

const loadHistory = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            if (!studentId) {
                setHistory([]);
                return;
            }
            const data = await getStudentOutpasses(studentId);
            setHistory(data);
        } catch (err) { console.log(err); }
        finally { setLoading(false); }
    };

    const statusColor = (status) => {
        switch (status) {
            case "Approved": return "success";
            case "Rejected": return "error";
            default: return "warning";
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "leaveDate", headerName: "Leave Date", flex: 1, minWidth: 130 },
        { field: "returnDate", headerName: "Return Date", flex: 1, minWidth: 130 },
        { field: "reason", headerName: "Reason", flex: 2, minWidth: 200 },
        { field: "status", headerName: "Status", width: 130, renderCell: (params) => (
            <Chip label={params.value} color={statusColor(params.value)} size="small"
                sx={{ fontWeight: 600, borderRadius: "8px", fontSize: "0.75rem" }}
                icon={params.value === "Approved" ? <CheckCircle2 size={14} /> : params.value === "Rejected" ? <XCircle size={14} /> : <Clock size={14} />}
            />
        )},
    ];

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress sx={{ color: "#6D28D9" }} /></Box>;

return (
        <Box>
            {/* Hero Section */}
            <PageHero
                icon={<History size={26} />}
                title="Outpass History"
                subtitle="Track all your outpass requests and their status."
                accent="#EC4899"
            />

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                    { label: "Total Requests", value: history.length, color: "#EC4899", icon: <FileText size={20} /> },
                    { label: "Approved", value: history.filter(h => h.status === "Approved").length, color: "#10B981", icon: <CheckCircle2 size={20} /> },
                    { label: "Pending", value: history.filter(h => h.status === "Pending").length, color: "#F59E0B", icon: <Clock size={20} /> },
                ].map((stat, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Paper sx={{ p: 3, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
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

<Paper sx={{ ...dataGridPaper, height: 500 }}>
                <DataGrid rows={history} columns={columns} pageSizeOptions={[5,10,20]}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} slots={{ toolbar: GridToolbar }}
                    sx={dataGridStyles}
                />
            </Paper>
        </Box>
    );
}

export default OutpassHistoryPage;

