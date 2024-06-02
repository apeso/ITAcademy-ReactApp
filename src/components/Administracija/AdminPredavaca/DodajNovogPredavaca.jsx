import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent } from '@mui/material';
import {updatePredavac, createPredavac} from "../../../firebase/CRUD_Predavaci";
import {getOrganizacije} from '../../../firebase/CRUD_Organizacije';

function DodajNovogPredavaca({ onClose, editPredavac }) {
  
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    zivotopis: '',
    organizacijaId: '',
    slika:''
  });
  const [organizacije, setOrganizacije] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);

  useEffect(() => {
    const fetchOrganizacije = async () => {
      try {
        const fetchedOrganizacije = await getOrganizacije();
        setOrganizacije(fetchedOrganizacije);
      } catch (error) {
        console.error('Došlo je do pogreške prilikom dohvaćanja organizacija:', error);
      }
    };
    fetchOrganizacije();
  }, []);
  

  useEffect(() => {
    if (editPredavac) {
      setFormData({
        ime: editPredavac.ime,
        prezime: editPredavac.prezime,
        zivotopis: editPredavac.zivotopis,
        organizacijaId: editPredavac.organizacijaId,
        slika:editPredavac.slika
      });
    }
  }, [editPredavac]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        slika: fileReader.result
      }));
    };
  };
  

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onClose();
  };

  const spremiPredavaca = async (e) => {
    e.preventDefault();
    if (formData.zivotopis.length < 200 || formData.zivotopis.length > 300) {
      alert('Životopis mora imati između 200 i 300 znakova. Trenutno sadrži ' + formData.zivotopis.length+ ' znakova.');
      return;
    }
    try {
      if (editPredavac && editPredavac.id) {
        await updatePredavac(editPredavac.id,formData)
      } else {
        await createPredavac(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom spremanja podataka:', error);
    }
    
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editPredavac ? 'Uredi predavača' : 'Dodaj novog predavača'}</DialogTitle>
        <DialogContent>
          <form onSubmit={spremiPredavaca}>
            <TextField
              label="Ime"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Prezime"
              name="prezime"
              value={formData.prezime}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Životopis"
              name="zivotopis"
              value={formData.zivotopis}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Organizacija</InputLabel>
              <Select
                name="organizacijaId"
                value={formData.organizacijaId}
                onChange={handleChange}
                required
              >
                {organizacije.map(organizacija => (
                  <MenuItem key={organizacija.id} value={organizacija.id}>
                    {organizacija.naziv}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="file"
              label="Slika"
              name="slika"
              onChange={handleFileChange}
              fullWidth
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

export default DodajNovogPredavaca;
