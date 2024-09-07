import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { updateRadionica, createRadionica } from '../../../firebase/CRUD_Radionice';
import { getPredavaci } from '../../../firebase/CRUD_Predavaci';
import { getTeme } from '../../../firebase/CRUD_Teme';

const DodavanjeRadionice = ({ onClose, editRadionica }) => {
  const tezine = ['Junior', 'Mid', 'Senior'];
  const preparationTypes = [
    'Basics',
    'Web Applications',
    'Mobile Applications',
    'UI/UX Design',
    'Artificial Intelligence',
    'Machine Learning',
];
const learningStyles = ['Interactive', 'Live', 'Workshops', 'Video Lessons', 'Reading PDF Documentation'];
const dailyCommitments = ['Daily', '3 times a week', 'Once a week', 'Weekend', 'As desired'];
const durations = ['1 week', '2 weeks', '3 weeks', '4 weeks', '5 weeks', '6 weeks', '7 weeks', '8 weeks'];


  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    temaId: '',
    tezina: '',
    predavacId: '',
    preparationType: '',
    learningStyle: '',
    dailyCommitment: '',
    cijena: '',
    duration: ''
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
        predavacId: editRadionica.predavacId,
        preparationType: editRadionica.preparationType || '',
        learningStyle: editRadionica.learningStyle || '',
        dailyCommitment: editRadionica.dailyCommitment || '',
        cijena: editRadionica.cijena || '',
        duration: editRadionica.duration || ''
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
        await updateRadionica(editRadionica.id, formData);
      } else {
        await createRadionica(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Mistake while saving ', error);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editRadionica ? 'Edit workshop' : 'Add a new workshop'}</DialogTitle>
        <DialogContent>
          <form onSubmit={spremiRadionicu}>
            <TextField
              label="Name"
              name="naziv"
              value={formData.naziv}
              onChange={handleChange}
              fullWidth
              required
              focused
              margin="normal"
            />
            <TextField
              label="Description"
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
              <InputLabel>Thema</InputLabel>
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
              <InputLabel>Level</InputLabel>
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
              <InputLabel>Tutors</InputLabel>
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Preparation types</InputLabel>
              <Select
                name="preparationType"
                value={formData.preparationType}
                onChange={handleChange}
                required
              >
                {preparationTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Learining styles</InputLabel>
              <Select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                required
              >
                {learningStyles.map(stil => (
                  <MenuItem key={stil} value={stil}>
                    {stil}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Daily commitment</InputLabel>
              <Select
                name="dailyCommitment"
                value={formData.dailyCommitment}
                onChange={handleChange}
                required
              >
                {dailyCommitments.map(posvecenost => (
                  <MenuItem key={posvecenost} value={posvecenost}>
                    {posvecenost}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Cijena"
              name="cijena"
              value={formData.cijena}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Duration</InputLabel>
              <Select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                {durations.map(trajanje => (
                  <MenuItem key={trajanje} value={trajanje}>
                    {trajanje}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={handleCloseDialog} color="secondary">
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DodavanjeRadionice;
