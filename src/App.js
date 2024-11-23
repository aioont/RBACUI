import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomePage from './pages/HomePage';
import UserList from './components/UserList';
import AddUserPage from './pages/AddUserPage';
import AddRolePage from './pages/AddRolePage';
import RoleList from './components/RoleList';
import EditUserPage from './pages/EditUserPage';
import RoleForm from './components/RoleForm';
import NotFound from './pages/NotFound';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navigationLinks = [
    { text: 'Home', path: '/' },
    { text: 'Roles', path: '/roles' },
    { text: 'Users', path: '/users' },
  ];

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Modern AppBar */}
        <AppBar position="sticky" sx={{ background: 'linear-gradient(90deg, #3f51b5, #1a237e)' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
            >
              RBAC Management System
            </Typography>
            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {navigationLinks.map((link) => (
                <Button key={link.text} color="inherit" href={link.path}>
                  {link.text}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer for Mobile */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>
              RBAC Management
            </Typography>
            <Divider />
            <List>
              {navigationLinks.map((link) => (
                <ListItem key={link.text} disablePadding>
                  <ListItemButton component="a" href={link.path}>
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/roles" element={<RoleList />} />
            <Route path="/add-role" element={<AddRolePage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
            <Route path="/edit-role/:id" element={<RoleForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
