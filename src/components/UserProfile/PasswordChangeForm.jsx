import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress, Typography } from '@mui/material';
import { doPasswordChange } from '../../auth.js';
import SuccessModal from './SuccessModal';

const PasswordChangeForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setIsChangingPassword(true);
    try {
      await doPasswordChange(newPassword);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
        setNewPassword('');
        setConfirmNewPassword('');
        setOpenModal(true);
        setErrorMessage('');
      setIsChangingPassword(false);
    }

  };

  const handleCloseModal = () => {
    setOpenModal(false);
};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
      borderRadius={2}
      textAlign="center"
      width={350}
      sx={{ backgroundColor: 'white', border: '1px solid #ddd'}}
    >
      <Typography variant="h5" component="h1" color="primary" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleChangePassword} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="outlined"
          disabled={isChangingPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          variant="outlined"
          disabled={isChangingPassword}
        />
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isChangingPassword}
          sx={{ mt: 3 }}
        >
          {isChangingPassword ? <CircularProgress size={24} /> : 'Change Password'}
        </Button>
      </form>
      <SuccessModal open={openModal} handleClose={handleCloseModal} />
    </Box>
  );
};

export default PasswordChangeForm;
