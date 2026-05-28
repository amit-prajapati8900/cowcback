import React, { useState } from "react";
import { 
  Box, Container, Paper, Tabs, Tab, TextField, Button, Typography, Alert, InputAdornment
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import MailOutlineIcon from '@mui/icons-material/MailOutlined';   
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'; 
import WaterDropIcon from '@mui/icons-material/WaterDrop';

// Modern Gradient Styled Background Container
const ModernBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

// Premium Glassmorphism Card Style
const ModernCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 4),
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(16px) saturate(120%)",
  webkitBackdropFilter: "blur(16px) saturate(120%)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  color: "#ffffff",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
    border: "1px solid rgba(0, 212, 255, 0.3)",
  }
}));

// Sleek Custom Style for Input Fields
const PremiumTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00d4ff",
      boxShadow: "0 0 8px rgba(0, 212, 255, 0.25)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    "&.Mui-focused": {
      color: "#00d4ff",
    },
  },
});

export default function Login() {
  const [tabValue, setTabValue] = useState(0); // 0 = Login, 1 = Signup
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (tabValue === 0) {
        // ==================== LOGIN FLOW ====================
        const res = await axios.post("http://localhost:2323/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          localStorage.clear(); 
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("loginTime", Date.now().toString()); 

          // 🟢 Navbar के लिए userId और userName को localStorage में ऐड किया
          // नोट: यदि आपका बैकएंड 'id' की जगह '_id' भेजता है, तो res.data.user._id लिखें
          const userId = res.data.user.id || res.data.user._id || "N/A";
          const userName = res.data.user.username || res.data.user.name || "User";
          
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", userName);

          window.location.href = "/customers";
        }
      } else {
        // ==================== SIGNUP FLOW ====================
        const res = await axios.post("http://localhost:2323/signup", formData);
     
        setSuccess(res.data.message + " Please log in.");
        setTabValue(0); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <ModernBackground>
      <Container maxWidth="xs" sx={{ p: 0 }}>
        <ModernCard elevation={0}>
          {/* Brand Logo & Title */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Box 
              sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: "16px", 
                background: "linear-gradient(135deg, #00d4ff 0%, #0072ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0, 212, 255, 0.3)",
                mb: 2
              }}
            >
              <WaterDropIcon sx={{ color: "#ffffff", fontSize: 32 }} />
            </Box>
            <Typography variant="h4" fontWeight="800" letterSpacing="1px" sx={{ background: "linear-gradient(to right, #ffffff, #00d4ff)", webkitBackgroundClip: "text", webkitTextFillColor: "transparent" }}>
              WATER CORP
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", mt: 0.5 }}>
              Management & Control Center
            </Typography>
          </Box>
          
          {/* Custom Sleek Tabs */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ 
              mb: 4,
              minHeight: "44px",
              background: "rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              padding: "4px",
              "& .MuiTabs-indicator": {
                background: "linear-gradient(90deg, #00d4ff 0%, #0072ff 100%)",
                height: "100%",
                borderRadius: "8px",
                zIndex: 0,
              },
            }}
          >
            <Tab 
              label="Sign In" 
              sx={{ color: "#ffffff", fontWeight: "600", zIndex: 1, textTransform: "none", minHeight: "36px", "&.Mui-selected": { color: "#ffffff" } }} 
            />
            <Tab 
              label="Sign Up" 
              sx={{ color: "#ffffff", fontWeight: "600", zIndex: 1, textTransform: "none", minHeight: "36px", "&.Mui-selected": { color: "#ffffff" } }} 
            />
          </Tabs>

          {error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: "10px", backgroundColor: "rgba(211, 47, 47, 0.8)" }}>{error}</Alert>}
          {success && <Alert severity="success" variant="filled" sx={{ mb: 3, borderRadius: "10px", backgroundColor: "rgba(56, 142, 60, 0.8)" }}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            {tabValue === 1 && (
              <PremiumTextField
                label="Username"
                name="username"
                fullWidth
                required
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            <PremiumTextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <PremiumTextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              sx={{ 
                mt: 4, 
                mb: 1, 
                fontWeight: "700",
                fontSize: "16px",
                textTransform: "none",
                borderRadius: "12px",
                padding: "12px",
                background: "linear-gradient(90deg, #00d4ff 0%, #0072ff 100%)",
                boxShadow: "0 6px 20px rgba(0, 212, 255, 0.3)",
                transition: "all 0.3s",
                "&:hover": {
                  background: "linear-gradient(90deg, #00bfe6 0%, #0066e6 100%)",
                  boxShadow: "0 8px 24px rgba(0, 212, 255, 0.5)",
                  transform: "translateY(-2px)"
                },
                "&:active": {
                  transform: "translateY(0)"
                }
              }}
            >
              {tabValue === 0 ? "Sign In" : "Get Started"}
            </Button>
          </form>
        </ModernCard>
      </Container>
    </ModernBackground>
  );
}