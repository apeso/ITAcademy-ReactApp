import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/UserContext';
import { getRadionice } from '../firebase/CRUD_Radionice';
import FilterTeme from '../components/Radionice/FilterTeme';
import RadionicaCard from '../components/Radionice/RadionicaCard';
import FilterTezine from '../components/Radionice/FilterTezine';
import "../style/Workshops.css";

const Radionice = () => {
  const [filterTeme, setFilterTeme] = useState('all');
  const [filterTezine, setFilterTezine] = useState('all');
  const [loading, setLoading] = useState(true);
  const [originalneRadionice, setOriginalneRadionice] = useState([]);
  const [radionice, setRadionice] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  const { isAdmin } = useAuth();

  const fetchRadioniceData = async () => {
    setLoading(true);
    try {
      const fetchedRadionice = await getRadionice();
      setOriginalneRadionice(fetchedRadionice);
      setRadionice(fetchedRadionice);
      console.log(radionice);
    } catch (error) {
      console.error('Došlo je do pogreške prilikom dohvaćanja radionice:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (isAdmin) {
      setErrorMessage('Admins are not allowed to access this page.');
    } else {
      fetchRadioniceData();
    }
  }, [isAdmin]);

  useEffect(() => {
    let filteredRadionice = originalneRadionice;

    if (filterTeme !== 'all') {
      filteredRadionice = filteredRadionice.filter(radionica => radionica.temaId === filterTeme);
    }

    if (filterTezine !== 'all') {
      filteredRadionice = filteredRadionice.filter(radionica => radionica.tezina === filterTezine);
    }

    setRadionice(filteredRadionice);
  }, [filterTeme, filterTezine, originalneRadionice]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const predavacId = searchParams.get('predavacId');
    if (predavacId) {
      const filteredRadionice = originalneRadionice.filter(radionica => radionica.predavacId === predavacId);
      setRadionice(filteredRadionice);
    }
  }, [location.search, originalneRadionice]);

  if (errorMessage) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" color="error">
          {errorMessage}
        </Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="pageRadionica">
        <div className="filterTezine">
          <FilterTezine setFilterTezine={setFilterTezine} filterTezine={filterTezine} />
        </div>
        <div className='midCont'>
          <div className="filterTeme">
            <FilterTeme setFilterTeme={setFilterTeme} filterTeme={filterTeme} />
            <br />
          </div>
          <div className="radioniceCard">
            {
              radionice.length === 0 ? (
                <h2 align="center">Oops! We couldn't find any results matching your filters. <br />Try changing your filters for better results.</h2>
              ) : (
                radionice.map(radionica => (
                  <RadionicaCard key={radionica.id} radionica={radionica} onEdit={fetchRadioniceData} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Radionice;
