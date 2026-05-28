import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Box,
  InputAdornment
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const ModernFormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 15px 40px rgba(25, 118, 210, 0.1)",
  }
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.2s ease-in-out",
    "&:hover fieldset": {
      borderColor: "rgba(25, 118, 210, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
      boxShadow: "0 0 8px rgba(25, 118, 210, 0.15)",
    },
  },
});

const BillingForm = ({ onBillGenerate }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    prevReading: "",
    currReading: "",
    units: 0,
    rate: 10,
    total: 0,
    paymentMethod: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBill = () => {
    const prev = Number(formData.prevReading);
    const curr = Number(formData.currReading);
    const rate = Number(formData.rate);
    const units = curr - prev;
    const total = units * rate;
    return { units, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { units, total } = calculateBill();

    if (units < 0) {
      alert("Error: Current reading cannot be less than previous reading!");
      return;
    }

    const newBill = {
      id: "BILL-" + Date.now().toString().slice(-6),
      customerId: formData.customerId,
      customerName: formData.customerName,
      prevReading: Number(formData.prevReading),
      currReading: Number(formData.currReading),
      units,
      rate: Number(formData.rate),
      total,
      paymentMethod: formData.paymentMethod,
      status: "Pending",
      date: new Date().toLocaleDateString("en-IN"),
    };

    onBillGenerate(newBill);

    setFormData({
      customerId: "",
      customerName: "",
      prevReading: "",
      currReading: "",
      units: 0,
      rate: 10,
      total: 0,
      paymentMethod: "",
      status: "Pending",
    });

    alert(`Bill Generated Successfully! Total: ₹${total}`);
  };

  return (
    <Box sx={{ py: 2 }}>
      <ModernFormCard elevation={0}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, borderBottom: "1px solid #f5f5f5", pb: 2 }}>
          <ReceiptLongIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="700" color="text.primary">
            Generate New Invoice
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Customer ID"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Previous Reading"
                name="prevReading"
                type="number"
                value={formData.prevReading}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Current Reading"
                name="currReading"
                type="number"
                value={formData.currReading}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Rate per Unit"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body1" fontWeight="600" color="text.secondary" sx={{ mr: 0.5 }}>₹</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                select
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online / UPI</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
              </StyledTextField>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
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
                  background: "linear-gradient(90deg, #1976d2 0%, #0072ff 100%)",
                  boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0 0%, #005ce6 100%)",
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Create Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </ModernFormCard>
    </Box>
  );
};

export default BillingForm;