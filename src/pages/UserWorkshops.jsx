import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPrijaveByEmail, deletePrijava } from '../firebase/CRUD_Prijave';
import { getRadionicaById } from '../firebase/CRUD_Radionice';
import { useAuth } from '../context/UserContext'; 
import '../style/UserProfile.css';

const UserWorkshops = () => {
  const { user } = useAuth();
  const [userPrijave, setUserPrijave] = useState([]);
  const [radionice, setRadionice] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPrijavaId, setSelectedPrijavaId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const prijave = await getPrijaveByEmail(user.email);
          setUserPrijave(prijave);
          
          const radionicaPromises = prijave.map((prijava) => 
            getRadionicaById(prijava.radionicaId)
          );

          const radioniceData = await Promise.all(radionicaPromises);
          const radioniceMap = {};
          radioniceData.forEach((radionica) => {
            radioniceMap[radionica.id] = radionica;
          });

          setRadionice(radioniceMap);
        }
        setLoading(false);
      } catch (error) {
        console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDeleteClick = (prijavaId) => {
    setSelectedPrijavaId(prijavaId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPrijavaId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePrijava(selectedPrijavaId);
      setUserPrijave(userPrijave.filter(prijava => prijava.id !== selectedPrijavaId));
      handleCloseDialog();
    } catch (error) {
      console.error('Došlo je do greške prilikom brisanja prijave:', error);
    }
  };

  return (
    <div className='pageUserWorkshops'>
      <h1>Workshops I applied for</h1>
      <Box className="workshopsContainer">
        {loading ? (
          <CircularProgress />
        ) : userPrijave.length === 0 ? (
          <Typography>No workshops found.</Typography>
        ) : (
          userPrijave.map((prijava) => {
            const radionica = radionice[prijava.radionicaId];
            return (
              <Card key={prijava.id} className="workshopCard">
                <CardContent className="cardContent">
                  {radionica && (
                    <>
                      <Typography variant="h6" className="workshopTitle">{radionica.naziv}</Typography>
                      
                      <div className="divider"></div>
                      <Typography variant="body1">Opis: {radionica.opis}</Typography>
                      <Typography variant="body1">Težina: {radionica.tezina}</Typography>
                    </>
                  )}
                  <Typography variant="body1">Razlog upisa: {prijava.razlogPrijave}</Typography>
                  <Typography variant="body1" className="workshopStatus">Status: {prijava.status}</Typography>
                  <div className='deleteButton'>
                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(prijava.id)} >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this prijava?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserWorkshops;
