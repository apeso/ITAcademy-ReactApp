//import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function HvalaModal(props){

  const handleClose = () => {
    props.setOpenThanks(false);
  };

  return (
    <>
      <Dialog
        open={props.openThanks}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Hvala Vam na prijavi na radionicu!</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Natrag</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default HvalaModal;
