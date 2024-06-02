import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar, CircularProgress } from '@mui/material';
import DodajNovogPredavaca from './DodajNovogPredavaca';
import { deletePredavac } from "../../../firebase/CRUD_Predavaci";
import { getOrganizacijaById } from '../../../firebase/CRUD_Organizacije';
import ConfirmDeleteDialog from '../../ConfirmDeleteDialog';

function TablicaPredavaci({ predavaci, isLoading, setIsLoading, fetchPredavaci }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editPredavac, setEditPredavac] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [organizacijeData, setOrganizacijeData] = React.useState({});
  
  React.useEffect(() => {
    const fetchOrganizacijeData = async () => {
      const organizacijeIds = predavaci.map(predavac => predavac.organizacijaId);
      const organizacijeData = {};
      await Promise.all(
        organizacijeIds.map(async organizacijaId => {
          const organizacija = await getOrganizacijaById(organizacijaId);
          organizacijeData[organizacijaId] = organizacija;
        })
      );
      setOrganizacijeData(organizacijeData);
    };

    if (!isLoading) {
      fetchOrganizacijeData();
    }
  }, [predavaci, isLoading]);

  const handleDelete = async (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deletePredavac(deleteId);
      fetchPredavaci();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom brisanja predavača:', error);
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
  };

  const handleEdit = (predavac) => {
    setIsEditing(true);
    setEditPredavac(predavac);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
    fetchPredavaci();
  };

  return (
    <div className='adminpages'>
      <h2>Popis predavača</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Slika</TableCell>
                <TableCell style={{ color: 'white' }}>Ime</TableCell>
                <TableCell style={{ color: 'white' }}>Prezime</TableCell>
                <TableCell style={{ color: 'white' }}>Životopis</TableCell>
                <TableCell style={{ color: 'white' }}>Organizacija</TableCell>
                <TableCell style={{ color: 'white' }}>Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predavaci.map(predavac => (
                <TableRow key={predavac.id}>
                  <TableCell>
                    <Avatar style={{width:'100px',height:'100px'}} alt={`${predavac.ime} ${predavac.prezime}`} src={predavac.slika} />
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {predavac.ime}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {predavac.prezime}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {predavac.zivotopis}
                  </TableCell>
                  <TableCell style={{ color: 'white' }}>
                    {organizacijeData[predavac.organizacijaId]?.naziv || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(predavac)}>Uredi</Button>
                    <Button onClick={() => handleDelete(predavac.id)}>Obriši</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && <DodajNovogPredavaca editPredavac={editPredavac} onClose={handleCloseClick} />}
          <ConfirmDeleteDialog 
            open={deleteDialogOpen} 
            onClose={() => setDeleteDialogOpen(false)} 
            onConfirm={handleConfirmDelete} 
          />  
        </>
      )}
    </div>
  );
}

export default TablicaPredavaci;
