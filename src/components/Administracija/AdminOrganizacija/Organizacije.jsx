import { Button } from '@mui/material';
import * as React from 'react';

import DodajNovuOrganizaciju from './DodajNovuOrganizaciju';
import TablicaOrganizacija from './TablicaOrganizacija';

import {getOrganizacije} from '../../../firebase/CRUD_Organizacije';


function Organizacije(){
  //const [isLoading, setIsLoading] = React.useState(true);
  const [organizacije, setOrganizacije] = React.useState([]);
  const [showNovuOrganizaciju, setShowNovuOrganizaciju] = React.useState(false);

  const fetchOrganizacije = async () => {
    //setIsLoading(true);
    try {
      const fetchedOrganizacije = await getOrganizacije();
      setOrganizacije(fetchedOrganizacije);
    } catch (error) {
      console.error('Došlo je do pogreške prilikom dohvaćanja organizacija:', error);
    }
    //setIsLoading(false);
  };

  React.useEffect(() => {
    fetchOrganizacije(); 
  }, []);

  const handleOpenClick = () => {
    setShowNovuOrganizaciju(true);
  };
  const handleCloseClick = () => {
    setShowNovuOrganizaciju(false);
    fetchOrganizacije(); 
  };
  return(
        <> 
           <Button variant="outlined" style={{ border: "1px solid orange", color: "orange",marginBottom:'20px' }} className='button-add'
            onClick={handleOpenClick}>
              + Dodaj novu organizaciju
              </Button>
            <TablicaOrganizacija organizacije={organizacije} /*isLoading={isLoading} setIsLoading={setIsLoading}*/ fetchOrganizacije={fetchOrganizacije} />

            {showNovuOrganizaciju && <DodajNovuOrganizaciju onClose={handleCloseClick} />}

        </>
    );

}
export default Organizacije;