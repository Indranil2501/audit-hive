import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GavelIcon from '@mui/icons-material/Gavel';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/logo.png'; // Add your logo file here

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  const menuItems = [
    { text: 'GST', tooltip: 'Goods and Services Tax', route: '/gst' },
    { text: 'SWT', tooltip: 'Software Tax', route: '/swt' },
    { text: 'CIT', tooltip: 'Corporate Income Tax', route: '/cit' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexGrow: 1,
            }}
            onClick={handleDashboardRedirect}
          >
            <Box
              component="img"
              src={logo}
              alt="Audit Hive Logo"
              sx={{
                height: 40,
                width: 40,
                marginRight: 1,
              }}
            />
            <Typography
              variant="h6" // Changed from h5 to h6 for a smaller font size
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontSize: '1rem', // Explicitly set a smaller font size
              }}
            >
              Audit Hive
            </Typography>
          </Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              marginTop: '64px', // Adjust for AppBar height
              height: 'calc(100% - 64px)', // Full height minus AppBar
              width: '240px', // Standard drawer width
              backgroundColor: '#1e1e2f', // Dark background
              color: '#ffffff', // White text
              padding: '16px', // Add padding for a clean layout
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <Tooltip key={item.text} title={item.tooltip} placement="right">
                <ListItem
                  button
                  onClick={() => handleMenuClick(item.route)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#2a2a3d', // Slightly lighter hover effect
                    },
                    borderRadius: '8px', // Rounded corners for a modern look
                    marginBottom: '8px', // Spacing between items
                  }}
                >
                  <ListItemIcon sx={{ color: '#ffffff' }}>
                    <GavelIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Header;