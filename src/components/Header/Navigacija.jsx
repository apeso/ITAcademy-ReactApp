// Navigacija.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import AccountMenu from './AccountMenu';

const Navigacija = () => {
  const { isAdmin, currentUser } = useAuth();

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
          '& > *': {
            margin: '0 11px',
            textDecoration: 'none',
            color: '#333',
            fontSize: '18px',
            paddingRight: '10px',
            transition: 'color 0.3s ease',
          },
          '& > *:hover': {
            color: 'black',
          },
        }}
      >
        <Button component={Link} to="/" sx={{ color: 'black' }}>Home</Button>
        {!isAdmin && (
          <Button component={Link} to="/radionice" sx={{ color: 'black' }}>Workshops</Button>
        )}
        {!isAdmin && (
          <Button component={Link} to="/predavaci" sx={{ color: 'black' }}>Tutors</Button>
        )}
        {!isAdmin && (
          <Button component={Link} to="/asistent" sx={{ color: 'black' }}>Assistent</Button>
        )}
        {isAdmin && (
          <Button component={Link} to="/administracija" sx={{ color: 'black' }}>
            Admin
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {currentUser && (
          <Typography color="grey" sx={{ marginRight: 1 }}>{currentUser.email}</Typography>
        )}
        <AccountMenu />
      </Box>
    </>
  );
};

export default Navigacija;
