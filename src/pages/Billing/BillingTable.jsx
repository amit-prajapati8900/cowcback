import React, { useState, useEffect } from "react";
import { 
  Box, Container, Paper, Tabs, Tab, Typography, TextField, 
  Button, Grid, MenuItem, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import { styled } from '@mui/material/styles';
import axios from "axios";

// Core Layout Extra Subcomponents
import Customer from "../Customer/Customer";
import Status from "../Customer/Status";
import CustomerTable from "../Customer/CustomerTable";

const MainHeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "linear-gradient(135deg, #0f2027 0%, #203a43 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  textAlign: 'center',
}));

const CustomTabsWrapper = styled(Paper)({
  borderRadius: "16px",
  padding: "6px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
});

const useBillingFormHook = (onBillGenerate) => {
  const initialFormState = {
    customerId: "",
    customerName: "",
    prevReading: "",
    currReading: "",
    units: 0,
    rate: 10,
    paymentMethod: "Cash",
    status: "Pending",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prev = Number(formData.prevReading);
    const curr = Number(formData.currReading);
    const rate = Number(formData.rate);
    const units = curr - prev;

    if (units < 0) {
      alert("Error: Current reading cannot be less than previous reading!");
      return;
    }

    const total = units * rate;
    const newBill = {
      id: "BILL-" + Date.now().toString().slice(-6),
      ...formData,
      prevReading: prev,
      currReading: curr,
      units,
      total,
      date: new Date().toLocaleDateString("en-IN"),
    };

    onBillGenerate(newBill);
    setFormData(initialFormState);
    alert(`Bill Generated Successfully! Total: ₹${total}`);
  };

  return { formData, handleChange, handleSubmit };
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export default function BillingTable() {
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);         
  const [tabValue, setTabValue] = useState(0);    
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:2323/show", getAuthHeader());
        setCustomers(res.data.data.map(c => ({ ...c, id: c._id })));
      } catch (err) { 
        console.error("Error fetching customers:", err);
        if(err.response?.status === 401){
           alert("Session expired! Please login again.");
           localStorage.clear();
           window.location.href = "/Login";
        }
      } finally { setLoading(false); }
    };
    
    const savedBills = localStorage.getItem('electricityBills');
    if (savedBills) setBills(JSON.parse(savedBills));
    fetchCustomers();
  }, []);

  const handleBillGenerate = (newBill) => {
    const updatedBills = [newBill, ...bills];
    setBills(updatedBills);
    localStorage.setItem('electricityBills', JSON.stringify(updatedBills));
    setTabValue(2); // Automatically hop to History tab
  };

  const handlePrint = (bill) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill - ${bill.id}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; background-color: #f9f9f9; }
            .bill-box { border: 1px solid #e0e0e0; border-radius: 12px; padding: 30px; width: 350px; margin: auto; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            h2 { text-align: center; color: #1976d2; margin-top:0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed #f0f0f0; padding-bottom: 8px; font-size: 14px; color: #444; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 15px; border-bottom: none; color: #2e7d32; }
          </style>
        </head>
        <body>
          <div class="bill-box">
            <h2>Water Corporation</h2>
            <div class="row"><span>Invoice ID:</span> <strong>${bill.id}</strong></div>
            <div class="row"><span>Date:</span> <span>${bill.date}</span></div>
            <div class="row"><span>Customer Name:</span> <span>${bill.customerName}</span></div>
            <div class="row"><span>Prev Reading:</span> <span>${bill.prevReading}</span></div>
            <div class="row"><span>Curr Reading:</span> <span>${bill.currReading}</span></div>
            <div class="row"><span>Units Used:</span> <span>${bill.units} M³</span></div>
            <div class="row"><span>Rate per Unit:</span> <span>₹${bill.rate}</span></div>
            <div class="row total"><span>Total Amount:</span> <span>₹${bill.total}</span></div>
            <p style="text-align:center; font-size: 11px; margin-top: 25px; color:#888;">Thank you for saving water.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const billingForm = useBillingFormHook(handleBillGenerate);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 6 }}>
      <Container maxWidth="xl">
        {/* Branding Core Header */}
        <MainHeaderPaper elevation={0} sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="900" letterSpacing="0.5px">⚡ Billing Control Center</Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mt: 1 }}>Manage real-time analytics, consumer accounts and automatic invoice prints</Typography>
        </MainHeaderPaper>

        {/* Dynamic Navigation Tabs */}
        <CustomTabsWrapper elevation={0} sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, v) => setTabValue(v)} 
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": { height: "100%", borderRadius: "12px", zIndex: 0, opacity: 0.08, backgroundColor: "#1976d2" },
              "& .MuiTab-root": { fontWeight: "700", textTransform: "none", fontSize: "15px", zIndex: 1 }
            }}
          >
            <Tab label="👥 Consumer Registry" />
            <Tab label="🧾 New Statement" />
            <Tab label="⏳ Invoice History" />
            <Tab label="📊 Grid View Table" />
          </Tabs>
        </CustomTabsWrapper>

        {/* Form Deployment Structure */}
        {tabValue === 1 && (
          <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <form onSubmit={billingForm.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Consumer ID" name="customerId" value={billingForm.formData.customerId} onChange={billingForm.handleChange} fullWidth required InputProps={{ borderRadius: "12px" }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Consumer Name" name="customerName" value={billingForm.formData.customerName} onChange={billingForm.handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Previous Run Value" name="prevReading" type="number" value={billingForm.formData.prevReading} onChange={billingForm.handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Current Run Value" name="currReading" type="number" value={billingForm.formData.currReading} onChange={billingForm.handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, borderRadius: "12px", fontWeight: "700" }}>
                    Process Current Invoice
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}

        {/* Statements Logging Grid */}
        {tabValue === 2 && (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "20px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ bgcolor: '#203a43' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }}>Bill ID</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }}>Customer</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }}>Units (M³)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }}>Total (₹)</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }}>Generated Date</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: "700" }} align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.length === 0 ? (
                  <TableRow><TableCell colSpan={6} align="center" sx={{ py: 8, color: "text.secondary" }}>No statements parsed in local workspace records.</TableCell></TableRow>
                ) : (
                  bills.map((bill) => (
                    <TableRow key={bill.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ fontWeight: "600" }}>{bill.id}</TableCell>
                      <TableCell>{bill.customerName}</TableCell>
                      <TableCell>{bill.units}</TableCell>
                      <TableCell sx={{ color: '#2e7d32', fontWeight: "700" }}>₹{bill.total}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell align="center">
                        <Button 
                          variant="outlined" 
                          startIcon={<PrintIcon />} 
                          onClick={() => handlePrint(bill)}
                          size="small"
                          sx={{ borderRadius: "8px", textTransform: "none", fontWeight: "600" }}
                        >
                          Print Voucher
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Tab Components Redirection Layer */}
        {tabValue === 0 && <Customer customers={customers} />}
        {tabValue === 3 && <CustomerTable customers={customers} />}

        <Box sx={{ mt: 5 }}><Status customers={customers} /></Box>
      </Container>
    </Box>
  );
}