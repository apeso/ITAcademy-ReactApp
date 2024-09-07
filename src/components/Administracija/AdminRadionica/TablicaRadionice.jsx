import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  CircularProgress,
  Avatar
} from '@mui/material';
import DodavanjeRadionice from './DodavanjeRadionice';
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
  const [expandedDescriptions, setExpandedDescriptions] = React.useState({});

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

  const handleSendingDataToServer = async () => {
    setIsLoading(true);
    
    const formattedData = radionice.map(radionica => ({
      tag: radionica.id,
      pattern: {
        naziv: radionica.naziv,
        tema: temeData[radionica.temaId]?.tema || 'N/A',
        opis: radionica.opis,
        tezina: radionica.tezina,
        preparationType: radionica.preparationType || 'N/A',
        learningStyle: radionica.learningStyle || 'N/A',
        dailyCommitment: radionica.dailyCommitment || 'N/A',
        predavac: `${predavaciData[radionica.predavacId]?.ime || 'N/A'} ${predavaciData[radionica.predavacId]?.prezime || 'N/A'}`,
        cijena: radionica.cijena || 'N/A',
        duration: radionica.duration || 'N/A',
        slika: temeData[radionica.temaId]?.slika || 'N/A',
      },
      response: radionica.id
    }));

    try {
      const response = await fetch('http://127.0.0.1:5000/process_workshopsData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Data successfully sent to the server:', responseData);
      
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className='adminpages'>
      <h2>List of a workshops</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
         <Button variant="outlined" onClick={handleSendingDataToServer}>Update data on a server</Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Image</TableCell>
                <TableCell style={{ color: 'white' }}>Name</TableCell>
                <TableCell style={{ color: 'white' }}>Description</TableCell>
                <TableCell style={{ color: 'white' }}>Theme</TableCell>
                <TableCell style={{ color: 'white' }}>Level</TableCell>
                <TableCell style={{ color: 'white' }}>Preparation type</TableCell>
                <TableCell style={{ color: 'white' }}>Learning style</TableCell>
                <TableCell style={{ color: 'white' }}>Daily commitment</TableCell>
                <TableCell style={{ color: 'white' }}>Tutors</TableCell>
                <TableCell style={{ color: 'white' }}>Price</TableCell>
                <TableCell style={{ color: 'white' }}>Duration</TableCell>
                <TableCell style={{ color: 'white' }}>Applications</TableCell>
                <TableCell style={{ color: 'white' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {radionice.map(radionica => (
                <TableRow key={radionica.id}>
                  <TableCell>
                    <Avatar style={{ width: '100px', height: '100px' }} alt={radionica.temaId} src={temeData[radionica.temaId]?.slika || 'N/A'} />
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.naziv}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {expandedDescriptions[radionica.id]
                      ? radionica.opis
                      : `${radionica.opis.substring(0, 40)}... `}
                    {radionica.opis.length > 40 && (
                      <Button onClick={() => toggleDescription(radionica.id)}>
                        {expandedDescriptions[radionica.id] ? 'Manje' : 'Više'}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {temeData[radionica.temaId]?.tema || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.tezina}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.preparationType || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.learningStyle || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.dailyCommitment || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {predavaciData[radionica.predavacId]?.ime || 'N/A'} {predavaciData[radionica.predavacId]?.prezime || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.cijena || 'N/A'}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {radionica.duration || 'N/A'}
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
