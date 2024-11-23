import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress, Grid } from '@mui/material';

const EditUserPage = () => {
  const { id } = useParams(); // Get the user ID from URL parameters
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Fetch the user details when the component mounts
  useEffect(() => {
    axios.get(`/users/${id}`).then((response) => {
      const userData = response.data;
      setUser(userData);
      setName(userData.name);
      setEmail(userData.email);
      setRole(userData.role);
      setStatus(userData.status);
      setLoading(false); // Set loading to false after data is fetched
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      role,
      status,
    };

    // Make the API call to update the user details
    axios.put(`/users/${id}`, updatedUser).then(() => {
      alert('User updated successfully!');
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
        Edit User
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Role Field */}
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Status Field */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update User
        </Button>
      </form>
    </Box>
  );
};

export default EditUserPage;
