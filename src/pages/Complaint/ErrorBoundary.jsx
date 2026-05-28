import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary framework layer:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 6 }}>
          <Paper 
            elevation={4} 
            sx={{ 
              p: 5, 
              maxWidth: 500, 
              textAlign: "center", 
              borderRadius: "24px", 
              border: "1px solid rgba(211, 47, 47, 0.2)",
              backgroundColor: "#fff5f5"
            }}
          >
            <ReportProblemOutlinedIcon sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />
            <Typography variant="h5" fontWeight="800" color="#d32f2f" gutterBottom>
              Component Exception Caught
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 2, lineHeight: 1.6 }}>
              {this.state.error?.message || "An unexpected rendering error occurred inside the live components layer view tree tracker loop stack."}
            </Typography>
            <Button 
              variant="contained" 
              color="error"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ 
                borderRadius: "12px", 
                textTransform: "none", 
                fontWeight: "700",
                px: 4,
                py: 1.2,
                boxShadow: "0 4px 14px rgba(211, 47, 47, 0.3)"
              }}
            >
              Reboot View Canvas
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;