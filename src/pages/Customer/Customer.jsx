import React, { useState, useEffect } from "react";
import {
  TextField, Button, Select, MenuItem, Box, Grid, Typography,
  Switch, FormControlLabel, Paper, InputLabel, FormControl
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CustomerTable from "./CustomerTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModernSectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.2s ease-in-out",
    "&:hover fieldset": { borderColor: "rgba(25, 118, 210, 0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2", boxShadow: "0 0 8px rgba(25, 118, 210, 0.1)" },
  },
});

const StyledSelect = styled(Select)({
  borderRadius: "12px",
  transition: "all 0.2s ease-in-out",
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(25, 118, 210, 0.4)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
});

export default function Customer({ customers, setCustomers, liveUpdate, setLiveUpdate }) {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    id: "", name: "", address: "", contact: "", email: "",
    connection: "", meter: "", usage: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/Login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      navigate("/Login");
      return;
    }

    if (!form.name || !form.address || !form.connection) {
      alert("Please fill in required fields!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:2323/new",
        {
          name: form.name,
          address: form.address,
          contact: form.contact,
          email: form.email,
          connection: form.connection,
          meter: form.meter,
          usage: parseFloat(form.usage) || 0
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      setCustomers([...customers, { ...res.data.customer, id: res.data.customer._id }]);
      setForm({ id: "", name: "", address: "", contact: "", email: "", connection: "", meter: "", usage: 0 });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.clear();
        navigate("/Login");
      } else {
        alert(err.response?.data?.message || "Error saving customer");
      }
    }
  };

  return (
    <Box>
      {/* Dynamic Subcontroller bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, px: 1 }}>
        <Typography variant="h5" fontWeight="800" color="text.primary">
          System Node Registry Form
        </Typography>
        <FormControlLabel
          control={
            <Switch 
              checked={liveUpdate} 
              onChange={(e) => setLiveUpdate(e.target.checked)}
              color="primary"
            />
          }
          label={<Typography variant="body2" fontWeight="700" color="text.secondary">Live Buffer Pipeline</Typography>}
        />
      </Box>

      {/* Form Grid Section Wrapper */}
      <ModernSectionCard elevation={0} sx={{ mb: 4 }}>
        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <StyledTextField fullWidth label="Consumer Full Name" name="name" value={form.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledTextField fullWidth label="Core Address Location" name="address" value={form.address} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StyledTextField fullWidth label="Contact Reference" name="contact" value={form.contact} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StyledTextField fullWidth label="Email Interface" name="email" value={form.email} onChange={handleChange} />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="connection-select-label">Connection Type *</InputLabel>
              <StyledSelect 
                labelId="connection-select-label"
                label="Connection Type *"
                name="connection" 
                value={form.connection} 
                onChange={handleChange}
              >
                <MenuItem value="Domestic">Domestic Grid</MenuItem>
                <MenuItem value="Commercial">Commercial Grid</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <StyledTextField fullWidth label="Hardware Meter Serial" name="meter" value={form.meter} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4} md={1.5}>
            <StyledTextField fullWidth label="Usage Metrics (L)" name="usage" type="number" value={form.usage} onChange={handleChange} />
          </Grid>
          
          <Grid item xs={12} sm={8} md={1.5} sx={{ alignSelf: "stretch", display: "flex" }}>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleAdd}
              startIcon={<Add />}
              sx={{ 
                borderRadius: "12px", 
                fontWeight: "700",
                textTransform: "none",
                fontSize: "15px",
                background: "linear-gradient(90deg, #1976d2 0%, #0072ff 100%)",
                boxShadow: "0 4px 12px rgba(25,118,210,0.2)"
              }}
            >
              Provisions
            </Button>
          </Grid>
        </Grid>
      </ModernSectionCard>

      <Box sx={{ mt: 4 }}>
        <CustomerTable customers={customers} />
      </Box>
    </Box>
  );
}