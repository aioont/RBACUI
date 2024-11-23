import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box, Grid } from '@mui/material';

const PermissionsForm = ({ permissions, selectedPermissions, onPermissionChange }) => {
  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Select Permissions
      </Typography>

      <FormGroup>
        {permissions.map((permission) => (
          <Grid container alignItems="center" spacing={2} key={permission}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => onPermissionChange(permission)}
                    name={permission}
                    color="primary"
                  />
                }
                label={permission}
              />
            </Grid>
          </Grid>
        ))}
      </FormGroup>
    </Box>
  );
};

export default PermissionsForm;
