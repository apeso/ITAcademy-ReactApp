import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material';
import { getPrijaveByRadionicaId, updatePrijavaStatus, deletePrijava } from '../../../firebase/CRUD_Prijave';
import ConfirmDeleteDialog from '../../ConfirmDeleteDialog';
import KorisnikTable from './KorisnikTable';

const PregledKorisnika = ({ open, onClose, radionicaID }) => {
  const [korisnici, setKorisnici] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedKorisnikId, setSelectedKorisnikId] = useState(null);

  useEffect(() => {
    const fetchPrijaveData = async () => {
      try {
        setIsLoading(true);
        const korisnici = await getPrijaveByRadionicaId(radionicaID);
        setKorisnici(korisnici);
      } catch (error) {
        console.error('Došlo je do pogreške prilikom dohvaćanja korisnika:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (radionicaID) {
      fetchPrijaveData();
    }
  }, [radionicaID]);

  const handleAccept = async (korisnikId) => {
    try {
      await updatePrijavaStatus(korisnikId, 'accepted');
      setKorisnici(prevState => 
        prevState.map(korisnik => 
          korisnik.id === korisnikId ? { ...korisnik, status: 'accepted' } : korisnik
        )
      );
    } catch (error) {
      console.error('Došlo je do pogreške prilikom ažuriranja statusa prijave:', error);
    }
  };

  const handleDeleteClick = (korisnikId) => {
    setSelectedKorisnikId(korisnikId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedKorisnikId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePrijava(selectedKorisnikId);
      setKorisnici(prevState => prevState.filter(korisnik => korisnik.id !== selectedKorisnikId));
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom brisanja prijave:', error);
    }
  };

  const sortedKorisnici = [...korisnici].sort((a, b) => {
    const statusOrder = { 'accepted': 1, 'declined': 2, 'waiting': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Prijavljeni korisnici</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : sortedKorisnici.length > 0 ? (
          <KorisnikTable 
            korisnici={sortedKorisnici} 
            onAccept={handleAccept} 
            onDelete={handleDeleteClick} 
          />
        ) : (
          <DialogContentText>Nema prijavljenih korisnika.</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
      </DialogActions>

      <ConfirmDeleteDialog 
        open={openConfirmDialog} 
        onClose={handleCloseConfirmDialog} 
        onConfirm={handleConfirmDelete} 
      />
    </Dialog>
  );
};

export default PregledKorisnika;
