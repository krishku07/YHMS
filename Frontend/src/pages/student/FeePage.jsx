import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  CreditCard,
  DollarSign,
  Receipt,
  CheckCircle2,
  Download,
  AlertCircle,
} from "lucide-react";

import {
  getStudentFees,
  downloadReceipt,
} from "../../api/feeApi";
import PageHero from "../../components/PageHero";
import { dataGridPaper, dataGridStyles } from "../../styles/dataGridStyles";

function FeePage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    setLoading(true);
    setError("");
    try {
      const studentId = localStorage.getItem("studentId");
      const data = await getStudentFees(studentId);
      setFees(data);
    } catch (error) {
      console.log(error);
      setError("Failed to load fee records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);

  const columns = [
    {
      field: "id",
      headerName: "Receipt ID",
      width: 120,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography
          fontWeight={600}
          sx={{ color: "#10B981" }}
        >
          ₹ {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: () => (
        <Chip
          label="Paid"
          size="small"
          icon={<CheckCircle2 size={14} />}
          sx={{
            fontWeight: 600,
            borderRadius: "8px",
            fontSize: "0.75rem",
            bgcolor: "rgba(34,197,94,0.15)",
            color: "#10B981",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        />
      ),
    },
    {
      field: "receipt",
      headerName: "Receipt",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<Download size={16} />}
          onClick={() => downloadReceipt(params.row.id)}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            background:
              "linear-gradient(135deg,#10B981,#16A34A)",
            boxShadow:
              "0 4px 12px rgba(34,197,94,0.25)",
            "&:hover": {
              background:
                "linear-gradient(135deg,#16A34A,#15803D)",
            },
          }}
        >
          Download
        </Button>
      ),
    },
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<CreditCard size={26} />}
        title="Fee Details"
        subtitle="View your hostel fee payment records and download receipts."
        accent="#F59E0B"
      />

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: "Total Payments",
            value: fees.length,
            color: "#F59E0B",
            icon: <Receipt size={20} />,
          },
          {
            label: "Total Amount Paid",
            value: `₹ ${totalAmount}`,
            color: "#10B981",
            icon: <DollarSign size={20} />,
          },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
          <Paper
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{
                      color: "#0F172A",
                      mt: 0.5,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: `${stat.color}12`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

{/* DataGrid */}
      <Paper sx={{ ...dataGridPaper, height: 520 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography color="#64748B">Loading fee records...</Typography>
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" gap={1}>
            <AlertCircle size={40} color="#EF4444" />
            <Typography color="#EF4444">{error}</Typography>
          </Box>
        ) : (
          <DataGrid
            rows={fees}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            sx={dataGridStyles}
          />
        )}
      </Paper>
    </Box>
  );
}

export default FeePage;
