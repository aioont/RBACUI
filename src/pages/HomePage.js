import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Box,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import api from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersResponse, rolesResponse] = await Promise.all([
          api.get('/users'),
          api.get('/roles')
        ]);
        
        setUserData(usersResponse.data);
        setRolesData(rolesResponse.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { 
      count: userData.filter(user => user.status === 'active').length,
      label: 'Active Users',
      icon: <PeopleIcon />
    },
    { 
      count: rolesData.length,
      label: 'Roles Defined',
      icon: <SecurityIcon />
    },
    { 
      count: rolesData.reduce((total, role) => 
        total + (role.permissions?.length || 0), 0),
      label: 'Permissions Set',
      icon: <SettingsIcon />
    }
  ];

  const quickActions = [
    {
      title: 'User Management',
      icon: <PeopleIcon fontSize="large" />,
      description: 'View and manage system users',
      link: '/users',
      color: 'primary.main'
    },
    {
      title: 'Role Management',
      icon: <SecurityIcon fontSize="large" />,
      description: 'View and manage roles',
      link: '/roles',
      color: 'success.main'
    },
    {
      title: 'Add New User',
      icon: <PersonAddIcon fontSize="large" />,
      description: 'Create a new user account',
      link: '/add-user',
      color: 'secondary.main'
    },
    {
      title: 'Add New Role',
      icon: <AddCircleOutlineIcon fontSize="large" />,
      description: 'Create a new role definition',
      link: '/add-role',
      color: 'warning.main'
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Welcome to RBAC Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4} sx={{ maxWidth: 600, mx: 'auto' }}>
          Manage your organization's users and roles with our comprehensive role-based access control system.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center" mb={6}>
          <Button
            onClick={() => handleNavigate('/add-user')}
            variant="contained"
            startIcon={<PersonAddIcon />}
            size="large"
          >
            Add New User
          </Button>
          <Button
            onClick={() => handleNavigate('/add-role')}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            size="large"
          >
            Add New Role
          </Button>
        </Box>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} mb={6}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <IconButton 
                color="primary" 
                sx={{ mb: 2 }}
                disableRipple
              >
                {stat.icon}
              </IconButton>
              <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                {stat.count}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Grid */}
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: activeCard === index ? 'scale(1.05)' : 'scale(1)',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleNavigate(action.link)}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardContent sx={{ p: 3 }}>
                <IconButton 
                  sx={{ 
                    color: action.color,
                    mb: 2,
                    '&:hover': { backgroundColor: 'transparent' }
                  }}
                  disableRipple
                >
                  {action.icon}
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {action.description}
                </Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    mt: 'auto',
                    textTransform: 'none'
                  }}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;