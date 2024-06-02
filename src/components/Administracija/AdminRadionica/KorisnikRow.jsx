import React from 'react';
import { TableRow, TableCell, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const KorisnikRow = ({ korisnik, onAccept, onDelete }) => (
  <TableRow key={korisnik.id}>
    <TableCell>{korisnik.punoIme}</TableCell>
    <TableCell>{korisnik.email}</TableCell>
    <TableCell>{korisnik.razlogPrijave}</TableCell>
    <TableCell>{korisnik.status}</TableCell>
    <TableCell>
      {korisnik.status === 'waiting' && (
        <Button onClick={() => onAccept(korisnik.id)}>Accept</Button>
      )}
      <IconButton onClick={() => onDelete(korisnik.id)}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default KorisnikRow;
