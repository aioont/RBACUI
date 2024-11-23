import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the API
    axios.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`/users/${id}`).then(() => {
        alert('User deleted successfully!');
        setUsers(users.filter((user) => user.id !== id));
      });
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      {/* Buttons to navigate to Add User and Add Role pages */}
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/add-user')} sx={{ marginRight: 2 }}>
          Add User
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate('/add-role')}>
          Add Role
        </Button>
      </Box>

      {/* Table to list users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/edit-user/${user.id}`)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
