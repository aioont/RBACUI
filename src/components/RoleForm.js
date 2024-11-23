import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button, Box, Grid, Typography, FormGroup } from '@mui/material';

const RoleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });
  const [permissions] = useState(['read', 'write', 'delete']);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the role details for editing
      axios.get(`/roles/${id}`).then((response) => {
        setFormData(response.data);
      });
    }
  }, [id]);

  const handleCheckboxChange = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((perm) => perm !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`/roles/${id}`, formData)
      : axios.post('/roles', formData);

    request.then(() => {
      alert(`Role ${id ? 'updated' : 'added'} successfully!`);
      navigate('/roles');
    });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Role' : 'Add Role'}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Role Name Input */}
        <TextField
          label="Role Name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Permissions Checkbox List */}
        <FormGroup sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Permissions:
          </Typography>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handleCheckboxChange(permission)}
                  name={permission}
                  color="primary"
                />
              }
              label={permission}
            />
          ))}
        </FormGroup>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: '10px', fontSize: '16px' }}
        >
          {id ? 'Update' : 'Add'} Role
        </Button>
      </form>
    </Box>
  );
};

export default RoleForm;
