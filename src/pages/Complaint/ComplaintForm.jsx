import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Alert,
  Box,
  InputAdornment
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ModernFormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 15px 40px rgba(42, 82, 152, 0.1)",
  }
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.2s ease-in-out",
    "&:hover fieldset": {
      borderColor: "rgba(42, 82, 152, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2a5298",
      boxShadow: "0 0 8px rgba(42, 82, 152, 0.15)",
    },
  },
});

const ComplaintForm = ({ onComplaintRegistered }) => {
  const [complaintData, setComplaintData] = useState({
    customerId: "",
    customerName: "",
    contact: "",
    type: "",
    description: "",
    status: "pending",
  });

  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
    if (successMsg) setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaintData.type) {
      setFormError("Please select a Complaint Type");
      return;
    }
    if (!complaintData.description.trim()) {
      setFormError("Please enter a detailed description");
      return;
    }

    try {
      const response = await fetch("http://localhost:2323/comp/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...complaintData,
          customerId: Number(complaintData.customerId),
          contact: Number(complaintData.contact),
        }),
      });

      if (!response.ok) throw new Error("Failed to save complaint");

      const savedComplaint = await response.json();
      onComplaintRegistered(savedComplaint);

      setSuccessMsg("Grievance ticket logged successfully into database!");

      setComplaintData({
        customerId: "",
        customerName: "",
        contact: "",
        type: "",
        description: "",
        status: "pending",
      });
    } catch (err) {
      console.error(err);
      setFormError("Error saving ticket. Please try again.");
    }
  };

  return (
    <ModernFormCard elevation={0}>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: "#1e3c72" }}>
        Register Your Complaint Statement
      </Typography>

      {formError && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: "10px" }}>{formError}</Alert>}
      {successMsg && <Alert severity="success" variant="filled" sx={{ mb: 3, borderRadius: "10px" }}>{successMsg}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Customer ID"
              name="customerId"
              value={complaintData.customerId}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Customer Name"
              name="customerName"
              value={complaintData.customerName}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              label="Registered Contact Number"
              name="contact"
              value={complaintData.contact}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              select
              label="Complaint Category"
              name="type"
              value={complaintData.type}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="" disabled>-- Select Complaint Type --</MenuItem>
              <MenuItem value="Billing">Billing Issue</MenuItem>
              <MenuItem value="Service Related">Service Related</MenuItem>
              <MenuItem value="Meter">Meter Problem</MenuItem>
              <MenuItem value="Other">Other Issues</MenuItem>
            </StyledTextField>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Elaborate Complaint Details"
              name="description"
              value={complaintData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              placeholder="Describe your infrastructure problem in detail..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                    <DescriptionOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "16px",
                textTransform: "none",
                background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                boxShadow: "0 4px 14px rgba(30, 60, 114, 0.3)",
                transition: "all 0.2s",
                "&:hover": {
                  background: "linear-gradient(90deg, #162e59 0%, #1f3e75 100%)",
                  boxShadow: "0 6px 20px rgba(30, 60, 114, 0.4)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Register Your Complaint
            </Button>
          </Grid>
        </Grid>
      </form>
    </ModernFormCard>
  );
};

export default ComplaintForm;