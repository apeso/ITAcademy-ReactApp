import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {deleteOrganizacije} from '../../../firebase/CRUD_Organizacije';
import DodajNovuOrganizaciju from './DodajNovuOrganizaciju';
import ConfirmDeleteDialog from '../../ConfirmDeleteDialog';

function TablicaOrganizacija({ organizacije, /*isLoading,setIsLoading,*/fetchOrganizacije}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editOrganizacija, setEditOrganizacija] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOrganizacije(deleteId);
      fetchOrganizacije();
    } catch (error) {
      console.error('Došlo je do pogreške prilikom brisanja organizacije:', error);
    }
    setDeleteDialogOpen(false);
  };

  const handleEdit = (organizacija) => {
    setIsEditing(true);
    setEditOrganizacija(organizacija);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
    fetchOrganizacije();
  };

  return (
    <div className='adminpages'>
      <h2>Popis organizacija</h2>
      {(false) ? (
        <p>Loading...</p>
      ) : (
        <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Naziv</TableCell>
              <TableCell style={{ color: 'white' }}>Opis</TableCell>
              <TableCell style={{ color: 'white' }}>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizacije.map(organizacija => (
              <TableRow key={organizacija.id}>
                <TableCell style={{ color: 'white' }}>
                  {organizacija.naziv}
                </TableCell>
                <TableCell style={{ color: 'white' }}>
                  {organizacija.opis}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(organizacija)}>Uredi</Button>
                    <Button onClick={() => handleDelete(organizacija.id)}>Obriši</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isEditing && <DodajNovuOrganizaciju editOrganizacije={editOrganizacija} onClose={handleCloseClick} />}
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

export default TablicaOrganizacija;