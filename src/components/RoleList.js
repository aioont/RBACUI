import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Box } from '@mui/material';

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from API
    axios.get('/roles').then((response) => {
      setRoles(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    // Delete role
    axios.delete(`/roles/${id}`).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Roles List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/add-role"
        sx={{ marginBottom: 2 }}
      >
        Add Role
      </Button>
      
      <TableContainer sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Role Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Permissions</Typography></TableCell>
              <TableCell><Typography variant="h6">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/edit-role/${role.id}`}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoleList;
