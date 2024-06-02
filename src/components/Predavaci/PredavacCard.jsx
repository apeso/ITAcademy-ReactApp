import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardMedia, CardActions } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import DodajNovogPredavaca from '../Administracija/AdminPredavaca/DodajNovogPredavaca';
import { getOrganizacijaById } from '../../firebase/CRUD_Organizacije';
const PredavacCard = ({ predavac,onEdit }) => {
  const { ime, prezime, zivotopis, organizacijaId, slika  } = predavac.predavac;
  const navigate = useNavigate(); 
  const[editPredavaca,setEditPredavaca]=useState(false);
  const { isAdmin } = useAuth();

  const handleEditClick =() =>{
    setEditPredavaca(true);
  }
  const handleCloseClick =() =>{
    setEditPredavaca(false);
    onEdit(); 
    
  }

  const [organizacijaNaziv, setOrganizacijaNaziv] = useState('');

  useEffect(() => {
    const fetchOrganizacijaNaziv = async () => {
      try {
        const organizacija = await getOrganizacijaById(organizacijaId);
        setOrganizacijaNaziv(organizacija.naziv);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja naziva organizacije:', error);
      }
      
    };
    fetchOrganizacijaNaziv();
  }, []);
  const handlePregledajRadioniceClick = () => {
    console.log("tu");
    navigate(`/radionice?predavacId=${predavac.predavac.id}`);
  };


  return (
    <Card className="predavac-card">
    <div className='card-image'>
      <CardMedia
        component="img"
        image={slika}
        alt={`${ime} ${prezime}`}
      />
      </div>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {ime} {prezime}
        </Typography><hr></hr>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {zivotopis}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <b>Organizacija:</b>{organizacijaNaziv}    
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Teme:</b>
          {predavac.teme.map( t=> (
            <span key={t.id}>{t.tema} </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions className="card-actions"> 
        <Button variant='contained' color="primary" onClick={handlePregledajRadioniceClick } size="small" className="pregledaj-button">Tutors workshops</Button> 
      </CardActions>
    </Card>
  );
};

export default PredavacCard;
