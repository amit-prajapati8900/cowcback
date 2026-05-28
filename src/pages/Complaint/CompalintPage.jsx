import React, { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import ComplaintTable from "./ComplaintTable";
import ErrorBoundary from "./ErrorBoundary";
import { Container, Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const TopHeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 30px rgba(30, 60, 114, 0.15)",
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

export default function ComplaintPage() {
  const [complaints, setComplaints] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleComplaintRegistered = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    // Table ko force refresh karne ke liye trigger increment karenge
    setRefreshTrigger((prev) => prev + 1);
    console.log("New Complaint Registered:", newComplaint);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
      <Container maxWidth="xl">
        <ErrorBoundary>
          {/* Main Top Grid Banner */}
          <TopHeaderPaper elevation={0}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mb: 1 }}>
              <RateReviewOutlinedIcon sx={{ fontSize: 40, color: "#00d4ff" }} />
              <Typography variant="h3" fontWeight="900" letterSpacing="0.5px">
                Grievance & Support Desk
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Log infrastructure faults, meter anomalies, or service issues directly into our grid monitoring system.
            </Typography>
          </TopHeaderPaper>

          {/* Core App Layout Flow */}
          <ComplaintForm onComplaintRegistered={handleComplaintRegistered} />
          <Box sx={{ mt: 5 }}>
            <ComplaintTable refreshTrigger={refreshTrigger} newlyAddedComplaints={complaints} />
          </Box>
        </ErrorBoundary>
      </Container>
    </Box>
  );
}