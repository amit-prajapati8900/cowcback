import React from "react";
import { Paper, Box, Typography } from "@mui/material";

// Premium StatsCard component replacing older wrappers
const LiveSensors = ({ title, value, icon, color, isAlert = false }) => {
  const getColorSchema = () => {
    if (isAlert && value > 0) return "linear-gradient(135deg, #811d1d 0%, #d32f2f 100%)";
    switch (color) {
      case "green": return "linear-gradient(135deg, #115e59 0%, #14b8a6 100%)";
      case "purple": return "linear-gradient(135deg, #581c87 0%, #a855f7 100%)";
      default: return "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "0px", // Sharp Advanced Look
        background: getColorSchema(),
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-4px)"
        }
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="caption" sx={{ letterSpacing: "1px", fontWeight: "800", opacity: 0.7, textTransform: "uppercase" }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="900" sx={{ mt: 1, fontFamily: "monospace" }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ fontSize: "40px", opacity: 0.25, display: "flex", zIndex: 1 }}>
        {icon}
      </Box>
    </Paper>
  );
};

export default LiveSensors;