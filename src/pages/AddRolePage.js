import React, { useState } from 'react';
import axios from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  FormGroup,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
  FormHelperText,
} from '@mui/material';

const AddRolePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });
  const [permissions] = useState(['read', 'write', 'delete']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((perm) => perm !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Post the new role data to the API
    axios
      .post('/roles', formData)
      .then(() => {
        setLoading(false);
        alert('Role added successfully!');
        navigate('/');
      })
      .catch(() => {
        setLoading(false);
        alert('An error occurred while adding the role.');
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Add New Role
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Role Name Field */}
            <Grid item xs={12}>
              <TextField
                label="Role Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
                helperText="Enter the name of the role"
              />
            </Grid>

            {/* Permissions */}
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth sx={{ marginTop: 2 }}>
                <InputLabel>Permissions</InputLabel>
                <FormGroup sx={{ marginTop: 5 }}>
                  {permissions.map((permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          checked={formData.permissions.includes(permission)}
                          onChange={() => handleCheckboxChange(permission)}
                          name={permission}
                        />
                      }
                      label={permission}
                    />
                  ))}
                </FormGroup>
                {/* Show helper text only when no permissions are selected */}
                {formData.permissions.length === 0 && (
                  <FormHelperText sx={{ color: 'red' }}>
                    Choose at least one permission
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !formData.name}
                sx={{ padding: 1.5 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Role'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRolePage;
