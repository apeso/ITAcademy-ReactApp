import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material';
import Prijava from './PrijavaModal';
import { getTemaByID } from '../../firebase/CRUD_Teme';
import { getPredavacByID } from '../../firebase/CRUD_Predavaci';

function RadionicaCard({ radionica }) {
  const { naziv, opis, temaId, tezina, predavacId, pripremaType, stilUcenja, dnevnaPosvecenost, cijena, trajanje } = radionica;
  const [temaNaziv, setTemaNaziv] = useState('');
  const [predavacFullName, setPredavacFullName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tema, predavac] = await Promise.all([
          getTemaByID(temaId),
          getPredavacByID(predavacId)
        ]);

        if (tema) {
          setTemaNaziv(tema);
        } else {
          throw new Error('Nije moguće dohvatiti temu.');
        }

        if (predavac) {
          const fullName = `${predavac.ime} ${predavac.prezime}`;
          setPredavacFullName(fullName);
        } else {
          throw new Error('Nije moguće dohvatiti predavača.');
        }
      } catch (error) {
        console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
      }
    };

    fetchData();
  }, [temaId, predavacId]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 800,
        margin: 2,
        padding: '10px',
        borderRadius: 2,
        border: '3px solid grey',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 12px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardMedia
        sx={{ width: 180, height: 180 }}
        image={temaNaziv && temaNaziv.slika}
        title="logo radionice"
      />
      <CardContent sx={{ flex: 1, textAlign: 'left', padding: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {naziv}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {opis}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Predavač:</b> {predavacFullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Tema:</b> {temaNaziv.tema}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Težina:</b> {tezina}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Tip pripreme:</b> {pripremaType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Stil učenja:</b> {stilUcenja}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Dnevna posvećenost:</b> {dnevnaPosvecenost}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Cijena:</b> {cijena}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Trajanje:</b> {trajanje}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'center', padding: 2 }}>
        <Prijava radionicaId={radionica.id} />
      </CardActions>
    </Card>
  );
}

export default RadionicaCard;
