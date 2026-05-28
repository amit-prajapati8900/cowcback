import React, { useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { 
  Chip, Paper, IconButton, Tooltip, Box, Typography, useTheme, TextField, InputAdornment, GlobalStyles
} from "@mui/material";
import {
  Print as PrintIcon,
  FileDownload as ExcelIcon,
  PictureAsPdf as PdfIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";

const StyledSearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    transition: "all 0.2s",
    "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2", backgroundColor: "#ffffff" }
  }
});

export default function CustomerTable({ customers }) {
  const [searchId, setSearchId] = useState("");
  const theme = useTheme();

  const filteredCustomers = !searchId
    ? customers
    : customers.filter(customer => 
        customer.id?.toString().toLowerCase().includes(searchId.toLowerCase())
      );

  const columns = [
    { field: "id", headerName: "System ID", width: 140, headerClassName: 'super-app-theme--header' },
    { field: "name", headerName: "Consumer Name", width: 160, headerClassName: 'super-app-theme--header' },
    { field: "address", headerName: "Installation Address", width: 220, headerClassName: 'super-app-theme--header' },
    { field: "contact", headerName: "Mobile Line", width: 140, headerClassName: 'super-app-theme--header' },
    { field: "email", headerName: "Email Node", width: 200, headerClassName: 'super-app-theme--header' },
    { 
      field: "connection", 
      headerName: "Grid Type", 
      width: 130,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Chip 
          label={params.value || "Domestic"} 
          size="small" 
          sx={{
            fontWeight: "700",
            fontSize: "11px",
            borderRadius: "6px",
            backgroundColor: params.value === "Commercial" ? "rgba(156, 39, 176, 0.1)" : "rgba(25, 118, 210, 0.1)",
            color: params.value === "Commercial" ? "#7b1fa2" : "#1565c0",
            border: "1px solid",
            borderColor: params.value === "Commercial" ? "rgba(156, 39, 176, 0.2)" : "rgba(25, 118, 210, 0.2)"
          }}
        />
      )
    },
    { field: "meter", headerName: "Meter ID", width: 130, headerClassName: 'super-app-theme--header' },
    { 
      field: "usage", 
      headerName: "Usage Metric", 
      width: 140,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Chip 
          label={`${(params.value || 0).toLocaleString()} Litres`} 
          size="small" 
          sx={{ fontWeight: "700", fontSize: "11px", backgroundColor: "rgba(76, 175, 80, 0.1)", color: "#2e7d32", border: "1px solid rgba(76, 175, 80, 0.2)" }}
        />
      )
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredCustomers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Consumers");
    XLSX.writeFile(wb, `consumers_report_sheet.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Customer Infrastructure Analytics Report", 15, 20);
    
    doc.autoTable({
      head: [['System ID', 'Consumer Name', 'Address', 'Mobile', 'Email', 'Grid Type', 'Meter', 'Usage']],
      body: filteredCustomers.map(row => [
        row.id, row.name, row.address, row.contact, row.email, row.connection, row.meter, `${row.usage} L`
      ]),
      startY: 28,
      theme: 'grid',
      styles: { fontSize: 8, font: "helvetica" },
      headStyles: { fillColor: [32, 58, 67], fontWeight: "bold" }
    });
    doc.save("consumers_matrix_pdf.pdf");
  };

  return (
    <Box>
      {/* 🟢 HARD RESET PRINT STYLES - Isse table ke alawa sab kuch transparent ya hidden ho jayega */}
      <GlobalStyles styles={{
        '@media print': {
          // Pure application ke saare nodes ko by default hide karo
          'body *': {
            visibility: 'hidden !important',
          },
          // Sirf hamari table container aur uske bache-kucho components ko force show karo
          '.printable-content, .printable-content *': {
            visibility: 'visible !important',
          },
          // Pura content top-left corner se shuru ho
          '.printable-content': {
            position: 'absolute !important',
            left: '0 !important',
            top: '0 !important',
            width: '100% !important',
            border: 'none !important',
            boxShadow: 'none !important',
            backgroundColor: '#ffffff !important',
          },
          // Pure dashboard panels aur filter area ko strict hide karo
          '.print-hide, header, nav, footer, form, .MuiAppBar-root, .MuiTabs-root': {
            display: 'none !important',
          },
          // Background layout parameters reset
          'body, html, #root': {
            backgroundColor: '#ffffff !important',
            margin: '0 !important',
            padding: '0 !important',
          }
        }
      }} />

      {/* 🟢 `.printable-content` class add ki hai pure table frame par */}
      <Paper 
        className="printable-content"
        elevation={0} 
        sx={{ 
          borderRadius: "20px", 
          border: "1px solid #eef2f5", 
          overflow: "hidden",
          '@media print': {
            border: 'none !important',
            boxShadow: 'none !important',
            '& .MuiDataGrid-footerContainer': { display: 'none !important' }, 
          }
        }}
      >
        {/* Header Controller Bar */}
        <Box 
          sx={{ 
            p: 3, 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: "1px solid #f5f5f5", 
            bgcolor: "#ffffff",
            '@media print': {
              borderBottom: '2px solid #000000 !important',
              pb: 1,
              mb: 2
            }
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="800" color="text.primary">
              Consumer Records Cache
            </Typography>
            <Typography variant="caption" color="text.secondary" className="print-hide">
              Displaying {filteredCustomers.length} nodes out of {customers.length} total cluster blocks
            </Typography>
          </Box>

          {/* Action and Search Block - Print ke waqt gayab */}
          <Box className="print-hide" sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <StyledSearchField
              size="small"
              variant="outlined"
              placeholder="Query Node ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              sx={{ width: 220 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchId && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchId("")}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Clean Action Icons Panel */}
            <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "12px", p: "3px", display: "flex", gap: "2px", bgcolor: "#f8f9fa" }}>
              <Tooltip title="Print Grid View"><IconButton onClick={handlePrint} size="small" color="primary"><PrintIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Extract XLS Sheet"><IconButton onClick={exportToExcel} size="small" color="success"><ExcelIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Compile PDF Statement"><IconButton onClick={exportToPDF} size="small" color="error"><PdfIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Reset Grid Workspace"><IconButton onClick={() => setSearchId("")} size="small" color="action"><RefreshIcon fontSize="small" /></IconButton></Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Main Framework DataGrid */}
        <Box 
          sx={{ 
            height: 480, 
            width: '100%',
            '@media print': {
              height: 'auto !important', 
              '& .MuiDataGrid-virtualScroller': { height: 'auto !important', overflow: 'visible !important' }
            }
          }}
        >
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            pageSize={100} 
            rowsPerPageOptions={[6, 12, 24]}
            disableSelectionOnClick
            getRowId={(row) => row.id || Math.random()}
            sx={{
              border: "none",
              [`& .${gridClasses.row}`]: { bgcolor: "white" },
              [`& .super-app-theme--header`]: {
                backgroundColor: "#203a43",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "14px",
                '@media print': {
                  backgroundColor: '#eaeded !important', 
                  color: '#000000 !important',
                  borderBottom: '2px solid #000 !important'
                }
              },
              '& .MuiDataGrid-cell': {
                borderBottom: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                color: "#4a5568",
                '@media print': {
                  color: '#000000 !important',
                  borderBottom: '1px solid #ddd !important'
                }
              },
              '@media print': {
                '& .MuiDataGrid-main': { border: '1px solid #b5b5b5' }
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}