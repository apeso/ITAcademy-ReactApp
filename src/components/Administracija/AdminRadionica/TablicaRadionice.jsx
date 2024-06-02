import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar, CircularProgress } from '@mui/material';
import DodavanjeRadionice from "./DodavanjeRadionice";
import { deleteRadionica } from '../../../firebase/CRUD_Radionice';
import { getPredavacByID } from '../../../firebase/CRUD_Predavaci';
import { getTemaByID } from '../../../firebase/CRUD_Teme';
import PregledKorisnika from './PregledKorisnika'; 
import ConfirmDeleteDialog from '../../ConfirmDeleteDialog';

function TablicaRadionice({ radionice, isLoading, setIsLoading, fetchRadionice }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editRadionicu, setEditRadionicu] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [predavaciData, setPredavaciData] = React.useState({});
  const [temeData, setTemeData] = React.useState({});
  const [workshopUsersDialogOpen, setWorkshopUsersDialogOpen] = React.useState(false);
  const [selectedRadionicaId, setSelectedRadionicaId] = React.useState(null);

  React.useEffect(() => {
    const fetchPredavaciData = async () => {
      const predavaciIDs = radionice.map(radionica => radionica.predavacId);
      const predavaciData = {};
      await Promise.all(
        predavaciIDs.map(async predavacId => {
          const predavac = await getPredavacByID(predavacId);
          predavaciData[predavacId] = predavac;
        })
      );
      setPredavaciData(predavaciData);
    };
    const fetchTemeData = async () => {
      const temeIDs = radionice.map(radionica => radionica.temaId);
      const temeData = {};
      await Promise.all(
        temeIDs.map(async temaId => {
          const tema = await getTemaByID(temaId);
          temeData[temaId] = tema;
        })
      );
      setTemeData(temeData);
    };
    const fetchData = async () => {
      try {
        if (!isLoading) {
          const predavaciPromise = fetchPredavaciData();
          const temePromise = fetchTemeData();
          await Promise.all([predavaciPromise, temePromise]);
        }
      } catch (error) {
        console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
      }
    };
    
    fetchData();
  }, [radionice]);

  const handleDelete = async (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteRadionica(deleteId);
      fetchRadionice();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom brisanja radionice:', error);
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
  };

  const handleEdit = (radionica) => {
    setIsEditing(true);
    setEditRadionicu(radionica);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
    fetchRadionice();
  };

  const handleWorkshopUsers = (id) => {
    setSelectedRadionicaId(id);
    setWorkshopUsersDialogOpen(true);
  };

  return (
    <div className='adminpages'>
      <h2>Popis radionica</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Slika</TableCell>
                <TableCell style={{ color: 'white' }}>Naziv</TableCell>
                <TableCell style={{ color: 'white' }}>Opis</TableCell>
                <TableCell style={{ color: 'white' }}>Tema</TableCell>
                <TableCell style={{ color: 'white' }}>Težina</TableCell>
                <TableCell style={{ color: 'white' }}>Predavači</TableCell>
                <TableCell style={{ color: 'white' }}>Prijavljeni</TableCell>
                <TableCell style={{ color: 'white' }}>Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {radionice.map(radionica => (
                <TableRow key={radionica.id}>
                  <TableCell>
                    <Avatar style={{width:'100px',height:'100px'}} alt={radionica.temaId} src={temeData[radionica.temaId]?.slika || 'N/A'} />
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.naziv}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.opis}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {temeData[radionica.temaId]?.tema || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.tezina}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {predavaciData[radionica.predavacId]?.ime || 'N/A'} {predavaciData[radionica.predavacId]?.prezime || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    <Button onClick={() => handleWorkshopUsers(radionica.id)}>Pregledaj</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(radionica)}>Uredi</Button>
                    <Button onClick={() => handleDelete(radionica.id)}>Obriši</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && <DodavanjeRadionice editRadionica={editRadionicu} onClose={handleCloseClick} />}
          <ConfirmDeleteDialog 
            open={deleteDialogOpen} 
            onClose={() => setDeleteDialogOpen(false)} 
            onConfirm={handleConfirmDelete} 
          />  
          <PregledKorisnika
            open={workshopUsersDialogOpen}
            onClose={() => setWorkshopUsersDialogOpen(false)}
            radionicaID={selectedRadionicaId} 
          />
        </>
      )}
    </div>
  );
}

export default TablicaRadionice;
