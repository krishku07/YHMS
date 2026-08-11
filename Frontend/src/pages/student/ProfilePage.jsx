import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  User,
  Mail,
  Phone,
  Home,
  Fingerprint,
  MapPin,
  GraduationCap,
  IdCard,
} from "lucide-react";

import { getStudentProfile } from "../../api/studentApi";
import PageHero from "../../components/PageHero";

function ProfilePage() {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const data = await getStudentProfile();
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress sx={{ color: "#6D28D9" }} />
      </Box>
    );
  }

  const infoItems = [
    { label: "Student ID", value: student.id, icon: <IdCard size={18} /> },
    { label: "Mobile Number", value: student.mobile, icon: <Phone size={18} /> },
    { label: "Email", value: student.email, icon: <Mail size={18} /> },
    { label: "Room Number", value: student.roomNumber, icon: <Home size={18} /> },
    { label: "Father Name", value: student.fatherName, icon: <User size={18} /> },
    { label: "Mother Name", value: student.motherName, icon: <User size={18} /> },
    { label: "College Name", value: student.collegeName, icon: <GraduationCap size={18} /> },
    { label: "Aadhaar Number", value: student.aadhaarNumber, icon: <Fingerprint size={18} /> },
    {
      label: "Permanent Address",
      value: student.permanentAddress,
      icon: <MapPin size={18} />,
      fullWidth: true,
    },
  ];

return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<User size={26} />}
        title="My Profile"
        subtitle="View your hostel profile."
        accent="#6D28D9"
      />

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "16px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#6D28D9",
            }}
          >
            <User size={45} />
          </Avatar>

          <Box>
            <Typography variant="h4" fontWeight={700}>
              {student.name}
            </Typography>

            <Typography color="#64748B">
              {student.email}
            </Typography>

            <Chip
              label={student.status || "Active"}
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {infoItems.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: item.fullWidth ? 12 : 6 }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: "12px",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  {item.icon}

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.label}
                    </Typography>

                    <Typography fontWeight={600}>
                      {item.value || "-"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

    </Box>
  );
}

export default ProfilePage;
