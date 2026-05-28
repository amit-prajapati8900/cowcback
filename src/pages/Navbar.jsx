import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Button, Avatar, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '22ch' },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(localStorage.getItem("token")));
  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState(""); 
  const [userInitials, setUserInitials] = React.useState("");

  const [complaintCount, setComplaintCount] = React.useState(0);
  const [leakageCount, setLeakageCount] = React.useState(0);
  const [newConnectionsCount, setNewConnectionsCount] = React.useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // ==================== FETCH ALERTS DATA ====================
  const fetchActiveAlerts = React.useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:2323/api/alerts-count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setComplaintCount(response.data.newComplaints || 0);
        setLeakageCount(response.data.activeLeakages || 0);
        setNewConnectionsCount(response.data.newConnections || 0);
      }
    } catch (err) {
      console.error("Alerts fetch error:", err);
    }
  }, []);

  // ==================== GET USER DATA & SESSION CHECK ====================
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName") || localStorage.getItem("name") || "User";
    const id = localStorage.getItem("userId") || localStorage.getItem("id") || "N/A"; 

    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
      setUserId(id); 

      const initials = name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      setUserInitials(initials);

      fetchActiveAlerts();

      const alertsInterval = setInterval(fetchActiveAlerts, 10000);
      return () => clearInterval(alertsInterval);
    } else {
      setIsLoggedIn(false);
    }

    const checkExpiry = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (token && loginTime) {
        const ONE_MINUTE = 60 * 1000;
        if (Date.now() - Number(loginTime) > ONE_MINUTE) {
          localStorage.clear();
          setIsLoggedIn(false);
          alert("Your 1-minute session has expired! Redirecting to login...");
          window.location.href = "/Login";
        }
      }
    };

    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
  }, [fetchActiveAlerts]);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  
  const handleMenuClose = () => { 
    setAnchorEl(null); 
    handleMobileMenuClose(); 
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    handleMenuClose();
    window.location.href = "/Login";
  };

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const toggleDrawer = (state) => () => {
    if (!isLoggedIn) return;
    setDrawerOpen(state);
  };

  const handleNotificationClick = (route) => {
    handleMenuClose();
    navigate(route);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu 
      anchorEl={anchorEl} 
      id={menuId} 
      open={isMenuOpen} 
      onClose={handleMenuClose}
      PaperProps={{ 
        sx: { 
          width: 220,
          backgroundColor: '#1e293b', 
          color: '#ffffff'
        } 
      }}
    >
      <MenuItem sx={{ flexDirection: 'column', alignItems: 'center', py: 2, '&:hover': { backgroundColor: 'transparent' } }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: '#1976d2', mb: 1 }}>
          {userInitials}
        </Avatar>
        <Typography variant="subtitle1" fontWeight="600">{userName}</Typography>
        <Typography variant="caption" color="#94a3b8" sx={{ mb: 0.5 }}>ID: {userId}</Typography>
        <Typography variant="body2" color="#00b0ff" fontWeight="500">Administrator</Typography>
      </MenuItem>
      
      <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#334155' } }}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#334155' } }}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#334155' } }}>Change Password</MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: '#f87171', '&:hover': { backgroundColor: '#334155' } }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} id={mobileMenuId} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem onClick={() => handleNotificationClick("/customers")}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={newConnectionsCount} color="info">
            <SmsIcon />
          </Badge>
        </IconButton>
        <p>New Consumers ({newConnectionsCount})</p>
      </MenuItem>

      <MenuItem onClick={() => handleNotificationClick("/complaints")}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={complaintCount} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Complaints ({complaintCount})</p>
      </MenuItem>

      <MenuItem onClick={() => handleNotificationClick("/sensors")}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={leakageCount} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Leakage Alerts ({leakageCount})</p>
      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2', mr: 1 }}>
          {userInitials}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="600">{userName}</Typography>
          <Typography variant="caption" color="text.secondary">ID: {userId}</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 8 }}>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(90deg, #0f172a, #1e2937)' }}>
        <Toolbar>
          {isLoggedIn && (
            <IconButton 
              size="large" 
              edge="start" 
              color="inherit" 
              aria-label="open drawer" 
              sx={{ mr: 2 }} 
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography 
            variant="h6" 
            noWrap 
            component={Link} 
            to="/" 
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '1px'
            }}
          >
            WATER CORP
          </Typography>

          {isLoggedIn && (
            <Search>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Search consumers, bills..." inputProps={{ 'aria-label': 'search' }} />
            </Search>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {isLoggedIn ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              
              <Tooltip title={`${newConnectionsCount} New Users/Connections`}>
                <IconButton size="large" color="inherit" onClick={() => handleNotificationClick("/customers")}>
                  <Badge badgeContent={newConnectionsCount} color="info">
                    <SmsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={`${complaintCount} New Complaints`}>
                <IconButton size="large" color="inherit" onClick={() => handleNotificationClick("/complaints")}>
                  <Badge badgeContent={complaintCount} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={`${leakageCount} Active Leakage Alerts`}>
                <IconButton size="large" color="inherit" onClick={() => handleNotificationClick("/sensors")}>
                  <Badge badgeContent={leakageCount} color="warning">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box 
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1.5 }}
                onClick={handleProfileMenuOpen}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#1976d2' }}>
                  {userInitials}
                </Avatar>
                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontWeight: 600 }}>{userName}</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>ID: {userId}</Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Button 
              component={Link} 
              to="/Login" 
              color="inherit" 
              variant="outlined" 
              sx={{ borderColor: 'white', fontWeight: 600 }}
            >
              Login / Sign Up
            </Button>
          )}

          {isLoggedIn && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ==================== PREMIUM BLACK SIDEBAR DRAWER ==================== */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: '#0f172a', 
            color: '#cbd5e1',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            pt: 3
          }
        }}
      >
        <Box sx={{ width: 260 }}>
          <Typography variant="h6" sx={{ color: '#ffffff', px: 3, mb: 3, fontWeight: 800, letterSpacing: '1px' }}>
            <span style={{ color: '#00b0ff' }}>CONTROL</span> CENTER
          </Typography>
          
          <List>
            {['customers', 'billing', 'dashboard', 'complaints', 'reports', 'sensors'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={`/${text}`} 
                  onClick={toggleDrawer(false)}
                  sx={{
                    textDecoration: 'none', 
                    color: 'inherit',
                    mx: 1.5,
                    borderRadius: '8px',
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 176, 255, 0.1)', 
                      color: '#00b0ff',
                      '& .MuiTypography-root': { fontWeight: '700' }
                    }
                  }}
                >
                  <ListItemText 
                    primary={text.charAt(0).toUpperCase() + text.slice(1)} 
                    primaryTypographyProps={{ style: { fontSize: '14.5px', fontWeight: '500', letterSpacing: '0.3px' } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {isLoggedIn && renderMobileMenu}
      {isLoggedIn && renderMenu}
    </Box>
  );
}