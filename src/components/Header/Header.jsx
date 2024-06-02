import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { SchoolOutlined } from '@mui/icons-material';
import Navigacija from './Navigacija';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: '80px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
            <SchoolOutlined sx={{ fontSize: '40px', marginRight: '10px' }} />
            IT Academy
          </Typography>
        </Box>
        <Navigacija />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
