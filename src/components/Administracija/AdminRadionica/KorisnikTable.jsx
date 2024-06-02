import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import KorisnikRow from './KorisnikRow';

const KorisnikTable = ({ korisnici, onAccept, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Puno ime</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Razlog prijave</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Akcije</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {korisnici.map(korisnik => (
        <KorisnikRow 
          key={korisnik.id} 
          korisnik={korisnik} 
          onAccept={onAccept} 
          onDelete={onDelete} 
        />
      ))}
    </TableBody>
  </Table>
);

export default KorisnikTable;
