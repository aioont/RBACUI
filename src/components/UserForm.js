import React, { useState } from 'react';
import axios from '../services/api.js';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';

const UserForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users', formData).then((response) => {
      onSave(response.data);
    });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
