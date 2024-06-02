import * as React from 'react';
import { createPrijava } from '../../firebase/CRUD_Prijave'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HvalaModal from './HvalaModal';
import { useAuth } from '../../context/UserContext';

function Prijava({ radionicaId }) {
    const [open, setOpen] = React.useState(false);
    const [openThanks, setOpenThanks] = React.useState(false);
    const { user } = useAuth();

    const [formData, setFormData] = React.useState({
        punoIme: '',
        email: '',
        razlogPrijave: '',
        radionicaId: radionicaId,
        status: 'waiting'
    });

    React.useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                punoIme: `${user.name} ${user.surname}`,
                email: user.email || ''
            }))
    }},[user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rez = await createPrijava(formData);
            if (rez) {
                console.log('Podaci uspješno spremljeni!');
                setFormData({
                    punoIme: '',
                    email: '',
                    razlogPrijave: '',
                    radionicaId: radionicaId,
                    status: 'waiting'
                });
                handleClose();
                setOpenThanks(true);
            } else {
                alert("Već smo zaprimili vašu prijavu na ovu radionicu.");
                handleClose();
            }
        } catch (error) {
            console.error('Došlo je do pogreške prilikom spremanja podataka:', error);
        }
    };
    

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Prijava
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Prijava</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Za prijavu na odabranu radionicu ispunite obrazac s vašim podacima.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="punoIme"
                        name="punoIme"
                        label="Ime i prezime"
                        type="text"
                        value={formData.punoIme}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="razlogPrijave"
                        name="razlogPrijave"
                        label="Razlog prijave"
                        type="text"
                        value={formData.razlogPrijave}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Odustani</Button>
                    <Button type="submit">Prijavi se</Button>
                </DialogActions>
            </Dialog>
            <HvalaModal openThanks={openThanks} setOpenThanks={setOpenThanks} />
        </React.Fragment>
    );
}

export default Prijava;
