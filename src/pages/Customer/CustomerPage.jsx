import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import Status from "./Status";
import CustomerTable from "./CustomerTable";
import { Box, Container, Paper, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const MainHeaderBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "linear-gradient(135deg, #0f2027 0%, #203a43 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const CustomTabsContainer = styled(Paper)({
  borderRadius: "16px",
  padding: "6px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
});

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:2323/show", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = res.data.data.map((c) => ({
        ...c,
        id: c._id,
        customerId: c.customerId || c._id,
      }));
      setCustomers(formatted);
    } catch (err) {
      console.error("Error fetching customers:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.clear();
        window.location.href = "/Login";
      } else {
        alert("Failed to load customers!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 5 }}>
      <Container maxWidth="xl">
        {/* Modern Branding Header */}
        <MainHeaderBanner elevation={0}>
          <Typography variant="h3" fontWeight="900" letterSpacing="0.5px">
            ⚡ Consumer Registry Hub
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mt: 1 }}>
            Provision new user node lines, handle structural utilities data and analyze asset logs.
          </Typography>
        </MainHeaderBanner>

        {/* Tab Navigation Framework */}
        <CustomTabsContainer elevation={0} sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": { height: "100%", borderRadius: "12px", zIndex: 0, opacity: 0.08, backgroundColor: "#1976d2" },
              "& .MuiTab-root": { fontWeight: "700", textTransform: "none", fontSize: "15px", zIndex: 1 }
            }}
          >
            <Tab label="👥 Account Provisions" />
            <Tab label="📈 Data-Grid Analytics" />
          </Tabs>
        </CustomTabsContainer>

        {/* Views Rendering Router Matrix */}
        {tabValue === 0 && (
          <Box>
            <Customer
              customers={customers}
              setCustomers={setCustomers}
              liveUpdate={liveUpdate}
              setLiveUpdate={setLiveUpdate}
            />
          </Box>
        )}

        {tabValue === 1 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #f0f0f0", boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}>
            <Box sx={{ width: "100%", height: 550 }}>
              <CustomerTable customers={customers} />
            </Box>
          </Paper>
        )}

        <Box sx={{ mt: 5 }}>
          <Status customers={customers} />
        </Box>
      </Container>
    </Box>
  );
}