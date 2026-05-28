import React from "react";
import { 
  Box, Container, Typography, Button, Grid, Paper, Stack, Chip, CardContent 
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import SpeedIcon from '@mui/icons-material/Speed';
import OpacityIcon from '@mui/icons-material/Opacity';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// ==================== ANIMATIONS ====================
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 176, 255, 0.3) }
  50% { box-shadow: 0 0 40px rgba(0, 176, 255, 0.6) }
  100% { box-shadow: 0 0 20px rgba(0, 176, 255, 0.3) }
`;

// ==================== MAIN HERO CONTAINER ====================
const MassiveHeroContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(180deg, #06090f 0%, #0a1628 50%, #0f172a 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  color: "#fff"
}));

const TechLightOrb = styled(Box)({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(180px)",
  opacity: 0.12,
  zIndex: 1
});

// ==================== FULL WIDTH COVER IMAGE CONTAINER ====================
const FullCoverHeroSection = styled(Box)({
  position: "relative",
  width: "100%",
  height: "75vh",
  minHeight: "600px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
});

const FullCoverImage = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  "img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  }
});

const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(90deg, rgba(6, 9, 15, 0.95) 0%, rgba(6, 9, 15, 0.7) 40%, rgba(6, 9, 15, 0.3) 100%)"
});

// ==================== MODULE CARDS ====================
const FuturisticSharpCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  borderRadius: "0px",
  backgroundColor: "#1a2332",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
  transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-15px)",
    borderColor: "#00b0ff",
    boxShadow: "0 50px 100px rgba(0, 176, 255, 0.15)",
    "& .module-img": {
      transform: "scale(1.08)",
    }
  }
}));

const SharpImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "220px", 
  [theme.breakpoints.down('sm')]: {
    height: "160px",
  },
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#0f172a",
  borderBottom: "2px solid rgba(0, 176, 255, 0.2)",
  padding: 0, 
}));

export default function Hero() {
  return (
    <MassiveHeroContainer>
      {/* Background Neon Orbs */}
      <TechLightOrb sx={{ width: "800px", height: "800px", background: "#00b0ff", top: "-20%", left: "-10%" }} />
      <TechLightOrb sx={{ width: "600px", height: "600px", background: "#00d4ff", bottom: "-10%", right: "-5%" }} />
      <TechLightOrb sx={{ width: "400px", height: "400px", background: "#7c3aed", top: "40%", left: "60%" }} />

      {/* ==================== FULL COVER HERO SECTION ==================== */}
      <FullCoverHeroSection>
        <FullCoverImage>
          <Box component="img" src="pip.jpg" alt="Water Pipeline Infrastructure" />
        </FullCoverImage>
        
        <ImageOverlay />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, pt: 8 }}>
          <Grid container spacing={6} alignItems="center">
            
            {/* LEFT CONTENT AREA */}
            <Grid item xs={12} lg={5.5}>
              <Box sx={{ pr: { lg: 6 } }}>
                <Chip 
                  label="⚡ SMART UTILITIES QUANTUM GRID v2.0"
                  sx={{ 
                    background: "linear-gradient(90deg, #00b0ff, #00d4ff)",
                    color: "#fff", fontWeight: 900, letterSpacing: "2px", px: 3, py: 1.5, fontSize: "11px",
                    borderRadius: "0px", mb: 4, animation: `${pulseGlow} 3s infinite`
                  }}
                />

                <Typography 
                  variant="h1" fontWeight="950" 
                  sx={{ 
                    mb: 3, lineHeight: 1.1,
                    fontSize: { xs: "2.4rem", md: "3.8rem", lg: "4.2rem" }, letterSpacing: "-1.5px",
                    background: "linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                  }}
                >
                  Water Corporation<br />
                  Management System
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ mb: 4, color: "#cbd5e1", lineHeight: 1.8, fontSize: "1.05rem", fontWeight: "300", fontFamily: "'Roboto', sans-serif" }}
                >
                  Next-generation complete water utility management platform designed for hyper-scalable distribution metrics processing, advanced billing statement caching pipelines, real-time fault node response diagnostics, 
                  customer relationship mapping algorithms, complaint ticketing resolution workflow automation, live flow sensor monitoring, grid volumetric consumption analytics, and comprehensive reporting dashboards.
                </Typography>

                {/* LIVE SYSTEM METRICS BAR */}
                <Paper sx={{ p: 3, bgcolor: "rgba(0, 176, 255, 0.08)", border: "1px solid rgba(0, 176, 255, 0.2)", borderRadius: "0px", mb: 5 }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" color="#00b0ff">
                        <SensorsIcon fontSize="small"/><Typography variant="caption" fontWeight="800" sx={{ letterSpacing: "1px" }}>ACTIVE SENSORS</Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight="900" sx={{ mt: 0.5 }}>1,482</Typography>
                      <Typography variant="caption" color="#64748b">Node Network</Typography>
                    </Box>
                    <Box sx={{ borderLeft: { sm: "1px solid rgba(255,255,255,0.1)" }, pl: { sm: 4 } }}>
                      <Stack direction="row" spacing={1} alignItems="center" color="#22c55e">
                        <SpeedIcon fontSize="small"/><Typography variant="caption" fontWeight="800" sx={{ letterSpacing: "1px" }}>PRESSURE INDEX</Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight="900" sx={{ mt: 0.5 }}>4.2 Bar</Typography>
                      <Typography variant="caption" color="#64748b">Static Flow</Typography>
                    </Box>
                    <Box sx={{ borderLeft: { sm: "1px solid rgba(255,255,255,0.1)" }, pl: { sm: 4 } }}>
                      <Stack direction="row" spacing={1} alignItems="center" color="#f59e0b">
                        <OpacityIcon fontSize="small"/><Typography variant="caption" fontWeight="800" sx={{ letterSpacing: "1px" }}>FLOW RATE</Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight="900" sx={{ mt: 0.5 }}>98.6%</Typography>
                      <Typography variant="caption" color="#64748b">Efficiency</Typography>
                    </Box>
                  </Stack>
                </Paper>

                {/* ACTION BUTTONS */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <Button 
                    component={Link} to="/Login" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      px: 5, py: 2, borderRadius: "0px", fontSize: "1rem", fontWeight: 800, textTransform: "none",
                      background: "linear-gradient(90deg, #00b0ff, #00d4ff)",
                      boxShadow: "0 20px 50px rgba(0, 176, 255, 0.3)",
                      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 25px 60px rgba(0, 176, 255, 0.4)" }
                    }}
                  >
                    Access Terminal
                  </Button>

                  <Button 
                    component={Link} to="/dashboard" variant="outlined" size="large" startIcon={<AssessmentOutlinedIcon />}
                    sx={{ 
                      px: 5, py: 2, borderRadius: "0px", fontSize: "1rem", fontWeight: 800, textTransform: "none",
                      borderWidth: "2px", color: "#fff", borderColor: "rgba(255,255,255,0.3)",
                      "&:hover": { borderColor: "#00b0ff", border: "2px solid #00b0ff", borderWidth: "2px", background: "rgba(0, 176, 255, 0.08)" }
                    }}
                  >
                    Dashboard
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} lg={6.5}></Grid>
          </Grid>
        </Container>
      </FullCoverHeroSection>

      {/* ==================== MODULES SECTION ==================== */}
      <Box sx={{ py: 12, bgcolor: "#06090f" }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" fontWeight="900" 
              sx={{ mb: 2, color: "#ffffff", fontSize: { xs: "1.8rem", md: "2.4rem" }, borderLeft: "5px solid #00b0ff", pl: 2.5 }}
            >
              Core Infrastructure Modules
            </Typography>
            <Typography variant="h6" color="#64748b" fontWeight="300">
              Select a module to access the control terminal
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {[
              { 
                title: "Billing System", 
                img: "tpk.png", 
                path: "/show", // 🟢 यहाँ सीधे /show राउट फिक्स कर दिया है
                desc: "Automated bill generation, payment processing, ledger caching, statement printing, tariff management, and revenue tracking algorithms.",
                icon: <ReceiptLongIcon sx={{ fontSize: 40 }} />,
                color: "#00b0ff"
              },
              { 
                title: "Customers", 
                img: "costomer.jpg", 
                path: "/customers", // 🟢 राउट फिक्स
                desc: "Centralized consumer database management, profile mapping, connection allocation, service activation, and account analytics.",
                icon: <PeopleIcon sx={{ fontSize: 40 }} />,
                color: "#22c55e"
              },
              { 
                title: "Complaints", 
                img: "puri.png", 
                path: "/complaints", // 🟢 राउट फिक्स
                desc: "Real-time grievance ticketing system, pressure anomaly detection, dispatch queue management, and automated escalation workflows.",
                icon: <WarningAmberIcon sx={{ fontSize: 40 }} />,
                color: "#f59e0b"
              },
              { 
                title: "Reports", 
                img: "pp.png", 
                path: "/reports", // 🟢 राउट फिक्स
                desc: "Comprehensive analytics dashboard, consumption charts, revenue forecasting, asset management reports, and data export pipelines.",
                icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
                color: "#8b5cf6"
              }
            ].map((module, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                {/* 🟢 अब यहाँ पर पुराने फॉर्मूले को हटाकर सीधे module.path का उपयोग किया गया है */}
                <FuturisticSharpCard component={Link} to={module.path} sx={{ textDecoration: "none" }}>
                  
                  <SharpImageContainer>
                    <Box 
                      component="img" src={module.img} alt={module.title} className="module-img"
                      sx={{ width: "100%", height: "100%", objectFit: "cover", p: 0, transition: "transform 0.5s ease" }} 
                    />
                  </SharpImageContainer>

                  <CardContent sx={{ p: 3, bgcolor: "#1a2332", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: module.color }}>
                      {module.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="900" color="#ffffff" gutterBottom sx={{ fontSize: "1.1rem" }}>
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="#94a3b8" sx={{ lineHeight: 1.7, fontSize: "13px", flexGrow: 1 }}>
                      {module.desc}
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", color: module.color, fontSize: "12px", fontWeight: 700 }}>
                      ACCESS MODULE <ArrowForwardIcon sx={{ fontSize: 16, ml: 1 }} />
                    </Box>
                  </CardContent>

                </FuturisticSharpCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </MassiveHeroContainer>
  );
}