import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
