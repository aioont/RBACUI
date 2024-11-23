// src/pages/NotFound.js
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 8 }}>
      {/* Error Icon and Message */}
      <Box sx={{ marginBottom: 3 }}>
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main' }} />
      </Box>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Oops! The page you're looking for does not exist. Please check the URL or go back to the homepage.
      </Typography>

      {/* Go to Home Button */}
      <Grid container justifyContent="center">
        <Grid item>
          <Link to="/">
            <Button variant="contained" color="primary" size="large" sx={{ padding: '10px 20px' }}>
              Go to Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
