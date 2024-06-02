import React, { useState,useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle ,DialogContent, DialogActions } from '@mui/material';

import {updateOrganizacije, createOrganizacije} from "../../../firebase/CRUD_Organizacije";

function DodajNovuOrganizaciju({onClose,editOrganizacije}) {
  const [openDialog, setOpenDialog] = useState(true);

  const [formData, setFormData] = useState({
    naziv: '',
    opis: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (editOrganizacije) {
      setFormData({
        naziv: editOrganizacije.naziv,
        opis: editOrganizacije.opis
      });
    }
  }, [editOrganizacije]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onClose();
  };

  const spremiOrganizaciju = async (e) => {
    e.preventDefault();
    try {
      if (editOrganizacije && editOrganizacije.id) {
        updateOrganizacije(editOrganizacije.id,formData)
      } else {
        createOrganizacije(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom spremanja podataka:', error);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editOrganizacije ? 'Uredi organizaciju' : 'Dodaj novu organizaciju'}</DialogTitle>
        <DialogContent>
          <form onSubmit={spremiOrganizaciju}>
            <TextField
              label="Naziv"
              name="naziv"
              value={formData.naziv}
              onChange={handleChange}
              fullWidth
              required
              focused
              margin="normal"
            />
            <TextField
              label="Opis"
              name="opis"
              value={formData.opis}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
            />
            <div style={{display:'flex'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary">Spremi</Button>
            <Button onClick={handleCloseDialog} color="primary">Zatvori</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DodajNovuOrganizaciju;
