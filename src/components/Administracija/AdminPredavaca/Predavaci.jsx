import * as React from 'react';
import { Button } from '@mui/material';

import DodajNovogPredavaca from "./DodajNovogPredavaca";
import TablicaPredavaci from "./TablicaPredavaci";
import {getPredavaci} from "../../../firebase/CRUD_Predavaci";

function Predavaci() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [predavaci, setPredavaci] = React.useState([]);
  const [showNovogPredavaca, setShowNovogPredavaca] = React.useState(false);

  const fetchPredavaci = async () => {
    setIsLoading(true);
    try {
      const fetchedPredavaci = await getPredavaci();
      setPredavaci(fetchedPredavaci);
    } catch (error) {
      console.error('Došlo je do pogreške prilikom dohvaćanja predavača:', error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => { 
    fetchPredavaci();
  }, []);

  const handleOpenClick = () => {
    setShowNovogPredavaca(true);
  };

  const handleCloseClick = () => {
    setShowNovogPredavaca(false);
    fetchPredavaci(); 
  };

  return (
    <>
      <Button variant="outlined" style={{ border: "1px solid orange", color: "orange", marginBottom:'20px'}} className='button-add' onClick={handleOpenClick}>
        + Dodaj novog predavača
      </Button> 
      <TablicaPredavaci predavaci={predavaci} isLoading={isLoading} setIsLoading={setIsLoading} fetchPredavaci={fetchPredavaci} /><br />

      {showNovogPredavaca && <DodajNovogPredavaca onClose={handleCloseClick} />}
    </>
  );
}

export default Predavaci;
