import React, { useState, useEffect } from 'react';
import FilterTeme from '../components/Radionice/FilterTeme';
import { useAuth } from '../context/UserContext';
import { CircularProgress, Typography } from '@mui/material';
import { getPredavaciITeme } from '../firebase/CRUD_Predavaci';
import PredavacCard from '../components/Predavaci/PredavacCard';
import TopSection from '../components/Predavaci/TopSection';
import ContactInfo from '../components/Home/ContactInfo';
import '../style/Tutors.css';

const Predavaci = () => {
  const [loading, setLoading] = useState(true); 
  const [filterTeme, setFilterTeme] = useState('all');
  const [predavaci, setPredavaci] = useState([]);
  const [originalPredavaci, setOriginalPredavaci] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { isAdmin} = useAuth();
  
  const fetchPredavaciData = async () => {
    try {
      const fetchedPredavaci = await getPredavaciITeme();
      setPredavaci(fetchedPredavaci);
      setOriginalPredavaci(fetchedPredavaci);
      setLoading(false); 
    } catch (error) {
      console.error('Došlo je do pogreške prilikom dohvaćanja predavača:', error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      setErrorMessage('Admins are not allowed to access this page.');
    } else {
      fetchPredavaciData();
    }
  }, [isAdmin]);

  useEffect(() => {
    let filteredPredavaci = [...originalPredavaci];

    if (filterTeme !== "all") {
      filteredPredavaci = filteredPredavaci.filter(predavac =>
        predavac.teme.some(tema => tema.id === filterTeme)
      );
    }
    setPredavaci(filteredPredavaci);
  }, [filterTeme, originalPredavaci]);

  if (errorMessage) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" color="error">
          {errorMessage}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <TopSection /> 
      {loading ? ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress /> 
        </div>
      ) : (
        <div className='pagePredavac'>
          <div className='filterTeme'>
            <FilterTeme setFilterTeme={setFilterTeme} filterTeme={filterTeme} /> <br></br>
          </div>
          <div className='predavacCard'>
            {predavaci.map(predavac => (
              <PredavacCard key={predavac.id} predavac={predavac} onEdit={fetchPredavaciData} />
            ))}
          </div>
        </div>
      )}
      <ContactInfo />
    </>
  );
};

export default Predavaci;
