import { useState } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, Grid } from "@mui/material";
import { DoorOpen, Calendar, ArrowRight, Send } from "lucide-react";
import { submitOutpass } from "../../api/outpassApi";
import PageHero from "../../components/PageHero";

function RequestOutpassPage() {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ leaveDate: "", returnDate: "", reason: "" });

  const validate = () => {
    const newErrors = { leaveDate: "", returnDate: "", reason: "" };

    if (!leaveDate) newErrors.leaveDate = "Leave Date is required.";
    if (!returnDate) newErrors.returnDate = "Return Date is required.";
    if (!reason || reason.trim() === "") newErrors.reason = "Reason is required.";

    setErrors(newErrors);

    return !newErrors.leaveDate && !newErrors.returnDate && !newErrors.reason;
  };

  const handleSubmit = async () => {
    // Prevent duplicate submissions while processing
    if (submitting) return;

    // Validate before submitting
    if (!validate()) return;

    setSubmitting(true);
    setErrorMsg("");

    const request = {
      studentId: Number(localStorage.getItem("studentId")),
      name: localStorage.getItem("studentName"),
      reason: reason.trim(), leaveDate, returnDate, status: "Pending",
    };
    try {
      await submitOutpass(request);
      setOpen(true);
      setLeaveDate(""); setReturnDate(""); setReason("");
      setErrors({ leaveDate: "", returnDate: "", reason: "" });
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Failed to submit outpass request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const redBorder = {
    "& .MuiOutlinedInput-root": { color: "#0F172A", borderRadius: "10px", bgcolor: "#FFFFFF" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
  };
  const errorBorder = {
    "& .MuiOutlinedInput-root": { color: "#0F172A", borderRadius: "10px", bgcolor: "#FFFFFF" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444", borderWidth: 2 },
  };

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<DoorOpen size={26} />}
        title="Request Outpass"
        subtitle="Submit a new outpass request for approval."
        accent="#EC4899"
      />

      <Paper elevation={0} sx={{ p: 4, borderRadius: "16px", maxWidth: 700, mx: "auto", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#0F172A", fontSize: "0.85rem" }}>Leave Date</Typography>
            <TextField type="date" fullWidth value={leaveDate} onChange={(e) => { setLeaveDate(e.target.value); setErrors((prev) => ({ ...prev, leaveDate: "" })); }}
              error={!!errors.leaveDate}
              helperText={errors.leaveDate}
              sx={errors.leaveDate ? errorBorder : redBorder}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#0F172A", fontSize: "0.85rem" }}>Return Date</Typography>
            <TextField type="date" fullWidth value={returnDate} onChange={(e) => { setReturnDate(e.target.value); setErrors((prev) => ({ ...prev, returnDate: "" })); }}
              error={!!errors.returnDate}
              helperText={errors.returnDate}
              sx={errors.returnDate ? errorBorder : redBorder}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ mb: 1, fontWeight: 600, color: "#0F172A", fontSize: "0.85rem" }}>Reason</Typography>
            <TextField multiline rows={5} fullWidth placeholder="Enter the reason for requesting an outpass..." value={reason} onChange={(e) => { setReason(e.target.value); setErrors((prev) => ({ ...prev, reason: "" })); }}
              error={!!errors.reason}
              helperText={errors.reason}
              sx={errors.reason ? errorBorder : redBorder}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" size="large" onClick={handleSubmit} endIcon={<ArrowRight size={18} />} disabled={submitting}
            sx={{ py: 1.3, px: 4, borderRadius: "10px", bgcolor: "#6D28D9", color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, textTransform: "none", boxShadow: "0 4px 15px rgba(139,92,246,0.3)", "&:hover": { bgcolor: "#5B21B6" }, "&:disabled": { bgcolor: "#A78BFA", color: "#FFFFFF" } }}
          >{submitting ? "Submitting..." : "Submit Request"}</Button>
        </Box>
      </Paper>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#10B981" }}>Outpass Request Submitted Successfully</Alert>
      </Snackbar>

      <Snackbar open={!!errorMsg} autoHideDuration={4000} onClose={() => setErrorMsg("")}>
        <Alert severity="error" variant="filled" sx={{ width: "100%", borderRadius: "10px", fontWeight: 600, bgcolor: "#EF4444" }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}

export default RequestOutpassPage;

