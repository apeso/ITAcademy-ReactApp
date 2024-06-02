import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { createTema } from '../../../firebase/CRUD_Teme';

function DodavanjeTemeRadionice({ open, onClose }) {
    const [formData, setFormData] = useState({
        slika: '',
        tema: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const spremiTemu = async () => {
        try {
            await createTema(formData);
            setFormData({
                slika: '',
                tema: ''
            });
            onClose(); 
        } catch (error) {
            console.error('Došlo je do pogreške prilikom spremanja podataka:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dodavanje nove teme</DialogTitle>
            <DialogContent>
                <TextField
                    label="Slika"
                    name="slika"
                    value={formData.slika}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Tema"
                    name="tema"
                    value={formData.tema}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Odustani</Button>
                <Button onClick={spremiTemu}>Spremi</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DodavanjeTemeRadionice;
