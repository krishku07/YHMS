import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Bell, CalendarDays } from "lucide-react";

import { getStudentNotices } from "../../api/noticeApi";
import PageHero from "../../components/PageHero";

function StudentNotice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await getStudentNotices(studentId);
      setNotices(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress sx={{ color: "#6D28D9" }} />
      </Box>
    );
  }

return (
    <Box className="fade-in">
      {/* Hero Section */}
      <PageHero
        icon={<Bell size={26} />}
        title="Notices"
        subtitle="Stay updated with the latest announcements from the hostel."
        accent="#6D28D9"
      />

      {notices.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "16px",
            textAlign: "center",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
          }}
        >
          <Bell size={48} color="#94a3b8" />

          <Typography
            variant="h6"
            mt={2}
            fontWeight={700}
            color="#0F172A"
          >
            No Notices Available
          </Typography>

          <Typography color="#64748B">
            You don't have any notices yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {notices.map((notice) => (
            <Grid
              key={notice.id}
              size={{ xs: 12 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderLeft: "6px solid #6D28D9",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#0F172A"
                  >
                    {notice.title}
                  </Typography>

                  <Chip
                    size="small"
                    label={
                      notice.targetType === "ALL"
                        ? "General"
                        : "Personal"
                    }
                    sx={{
                      fontWeight: 600,
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      bgcolor: notice.targetType === "ALL" ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.1)",
                      color: notice.targetType === "ALL" ? "#6D28D9" : "#5B21B6",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "#475569",
                    mb: 3,
                    whiteSpace: "pre-line",
                    lineHeight: 1.7,
                  }}
                >
                  {notice.message}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#64748b",
                  }}
                >
                  <CalendarDays size={18} />

                  <Typography variant="body2">
                    {notice.createdAt
                      ? new Date(notice.createdAt).toLocaleString()
                      : ""}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default StudentNotice;
