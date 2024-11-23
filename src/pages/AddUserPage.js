import React, { useState, useEffect } from 'react';
import axios from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
} from '@mui/material';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active',
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available roles
    axios.get('/roles').then((response) => {
      setRoles(response.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post the new user data to the API
    axios.post('/users', formData).then(() => {
      alert('User added successfully!');
      navigate('/');
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New User
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Role Field */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Select Role</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Field */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddUserPage;
