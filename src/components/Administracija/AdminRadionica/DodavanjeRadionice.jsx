import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { updateRadionica, createRadionica } from "../../../firebase/CRUD_Radionice";
import { getPredavaci } from "../../../firebase/CRUD_Predavaci";
import { getTeme } from "../../../firebase/CRUD_Teme";

const DodavanjeRadionice = ({ onClose, editRadionica }) => {
  const tezine = ["Junior", "Mid", "Senior"];
  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    temaId:'' ,
    tezina: '',
    predavacId:''
  });

  const [sviPredavaci, setSviPredavaci] = useState([]);
  const [sveTeme, setSveTeme] = useState([]);

  const [openDialog, setOpenDialog] = useState(true);

  useEffect(() => {
    const fetchPredavace = async () => {
      try {
        const fetchedPredavaci = await getPredavaci();
        setSviPredavaci(fetchedPredavaci);
        const fetchedTeme = await getTeme();
        setSveTeme(fetchedTeme);
      } catch (error) {
        console.error('Došlo je do pogreške prilikom dohvaćanja predavaca:', error);
      }
    };
    fetchPredavace();
  }, []);

  useEffect(() => {
    if (editRadionica) {
      setFormData({
        naziv: editRadionica.naziv,
        opis: editRadionica.opis,
        temaId: editRadionica.temaId,
        tezina: editRadionica.tezina,
        predavacId: editRadionica.predavacId
      });
    }
  }, [editRadionica]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onClose();
  };

  const spremiRadionicu = async (e) => {
    e.preventDefault();
    try {
      if (editRadionica && editRadionica.id) {
        await updateRadionica(editRadionica.id, formData)
      } else {
        await createRadionica(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom spremanja podataka:', error);
    }

  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editRadionica ? 'Uredi radionicu' : 'Dodaj radionicu'}</DialogTitle>
        <DialogContent>
          <form onSubmit={spremiRadionicu}>
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Tema</InputLabel>
              <Select
                name="temaId"
                value={formData.temaId}
                onChange={handleChange}
                required
              >
                {sveTeme.map(tema => (
                  <MenuItem key={tema.id} value={tema.id}>
                    {tema.tema}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Težina</InputLabel>
              <Select
                name="tezina"
                value={formData.tezina}
                onChange={handleChange}
                required
              >
                {tezine.map(t => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Predavači</InputLabel>
              <Select
                name="predavacId"
                value={formData.predavacId}
                onChange={handleChange}
                required
              >
                {sviPredavaci.map(predavac => (
                  <MenuItem key={predavac.id} value={predavac.id}>
                    {predavac.ime} {predavac.prezime}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: 'flex' }}>
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
export default DodavanjeRadionice;
