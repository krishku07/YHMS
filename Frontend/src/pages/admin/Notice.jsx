import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  Bell,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";

import {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../../api/noticeApi";

import { getStudents } from "../../api/studentApi";
import PageHero from "../../components/PageHero";
import { dataGridPaper, dataGridStyles } from "../../styles/dataGridStyles";

function NoticePage() {

  const [notices, setNotices] = useState([]);
  const [students, setStudents] = useState([]);

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [message, setMessage] = useState("");

  const [snackbar, setSnackbar] = useState(false);

  const [notice, setNotice] = useState({

    title: "",

    message: "",

    targetType: "ALL",

    studentId: "",

    status: "Active",

  });

  useEffect(() => {

    loadNotices();

    loadStudents();

  }, []);

  const loadNotices = async () => {

    const data = await getNotices();

    setNotices(data);

  };

  const loadStudents = async () => {

    const data = await getStudents();

    setStudents(data);

  };

  const handleChange = (e) => {

    setNotice({

      ...notice,

      [e.target.name]: e.target.value,

    });

  };

  const clearForm = () => {

    setNotice({

      title: "",

      message: "",

      targetType: "ALL",

      studentId: "",

      status: "Active",

    });

    setEditing(false);

    setSelectedId(null);

  };

  const saveNotice = async () => {

    try {

      if (editing) {

        await updateNotice(selectedId, notice);

        setMessage("Notice Updated Successfully");

      } else {

        await addNotice(notice);

        setMessage("Notice Sent Successfully");

      }

      setSnackbar(true);

      setOpen(false);

      clearForm();

      loadNotices();

    } catch (e) {

      console.log(e);

    }

  };

  const editNotice = (row) => {

    setNotice(row);

    setSelectedId(row.id);

    setEditing(true);

    setOpen(true);

  };

  const removeNotice = async (id) => {

    if (!window.confirm("Delete this notice?")) return;

    await deleteNotice(id);

    setMessage("Notice Deleted");

    setSnackbar(true);

    loadNotices();

  };

  const columns = [

    {

      field: "title",

      headerName: "Title",

      flex: 1,

    },

    {

      field: "message",

      headerName: "Message",

      flex: 2,

    },

    {

      field: "targetType",

      headerName: "Target",

      width: 130,

    },

    {

      field: "studentId",

      headerName: "Student",

      width: 120,

    },

    {

      field: "createdAt",

      headerName: "Created",

      width: 180,

    },

    {

      field: "action",

      headerName: "Action",

      width: 140,

      sortable: false,

      renderCell: (params) => (

        <Box sx={{ display: "flex", gap: 1 }}>

          <IconButton

            color="primary"

            onClick={() => editNotice(params.row)}

          >

            <Pencil size={18} />

          </IconButton>

          <IconButton

            color="error"

            onClick={() => removeNotice(params.row.id)}

          >

            <Trash2 size={18} />

          </IconButton>

        </Box>

      ),

    },

  ];
return (
  <Box className="fade-in">

    {/* Hero Section */}
    <PageHero
      icon={<Bell size={26} />}
      title="Notice Management"
      subtitle="Send notices to all students or an individual student."
      actionLabel="Send Notice"
      actionIcon={<Plus size={18} />}
      onAction={() => { clearForm(); setOpen(true); }}
      accent="#6D28D9"
    />

    <Paper sx={dataGridPaper} style={{ height: 600 }}>
      <DataGrid
        rows={notices}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
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
    </Paper>

    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: "1.25rem", color: "#0F172A", pb: 1 }}>
        {editing ? "Edit Notice" : "Send Notice"}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={notice.title}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#0F172A",
                  bgcolor: "#FFFFFF",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9", borderWidth: 2 },
                },
                "& .MuiInputLabel-root": { color: "#64748B", "&.Mui-focused": { color: "#6D28D9" } },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              name="message"
              value={notice.message}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#0F172A",
                  bgcolor: "#FFFFFF",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9", borderWidth: 2 },
                },
                "& .MuiInputLabel-root": { color: "#64748B", "&.Mui-focused": { color: "#6D28D9" } },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                color: "#0F172A",
                bgcolor: "#FFFFFF",
                borderRadius: "10px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
              },
              "& .MuiInputLabel-root": { color: "#64748B", "&.Mui-focused": { color: "#6D28D9" } },
              "& .MuiSelect-icon": { color: "#64748B" },
            }}>
              <InputLabel>Send To</InputLabel>

              <Select
                name="targetType"
                value={notice.targetType}
                label="Send To"
                onChange={handleChange}
              >
                <MenuItem value="ALL">
                  All Students
                </MenuItem>

                <MenuItem value="INDIVIDUAL">
                  Particular Student
                </MenuItem>

              </Select>

            </FormControl>
          </Grid>

          {notice.targetType === "INDIVIDUAL" && (

            <Grid size={{ xs: 12, md: 6 }}>

              <FormControl fullWidth sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#0F172A",
                  bgcolor: "#FFFFFF",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9" },
                },
                "& .MuiInputLabel-root": { color: "#64748B", "&.Mui-focused": { color: "#6D28D9" } },
              }}>
                <InputLabel>Student</InputLabel>

                <Select
                  name="studentId"
                  value={notice.studentId}
                  label="Student"
                  onChange={handleChange}
                >

                  {students.map((student) => (

                    <MenuItem
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </MenuItem>

                  ))}

                </Select>

              </FormControl>

            </Grid>

          )}

        </Grid>

      </DialogContent>

      <DialogActions sx={{ p: "16px 24px 24px", gap: 1 }}>

        <Button onClick={() => setOpen(false)} sx={{ color: "#64748B", fontWeight: 600, textTransform: "none", borderRadius: "10px", "&:hover": { bgcolor: "#F1F5F9" } }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={saveNotice}
          sx={{ bgcolor: "#6D28D9", color: "#FFFFFF", fontWeight: 600, textTransform: "none", borderRadius: "10px", px: 3, "&:hover": { bgcolor: "#5B21B6" } }}
        >
          {editing ? "Update Notice" : "Send Notice"}
        </Button>

      </DialogActions>

    </Dialog>
          <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "10px",
            fontWeight: 600,
            bgcolor: "#10B981",
          }}
        >
          {message}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default NoticePage;
