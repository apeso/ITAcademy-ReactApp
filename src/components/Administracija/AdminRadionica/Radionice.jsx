import React, { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import DodavanjeRadionice from "./DodavanjeRadionice";
import TablicaRadionice from "./TablicaRadionice";
import DodavanjeTemeRadionice from './DodavanjeTemeRadionice';
import {getRadionice} from '../../../firebase/CRUD_Radionice';

function Radionice() {
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [radionice, setRadionice] = useState([]);
    const [showNovuRadionicu, setShowNovuRadionicu] = useState(false);

    const fetchRadionice = async () => {
        setIsLoading(true);
        try {
          const fetchedRadionice = await getRadionice();
          setRadionice(fetchedRadionice);
        } catch (error) {
          console.error('Došlo je do pogreške prilikom dohvaćanja radionica:', error);
        }
        setIsLoading(false);
      };
    
    useEffect(() => { 
        fetchRadionice();
      }, []);

   
    const handleOpenClick = () => {
        setShowNovuRadionicu(true);
      };
    
    const handleCloseClick = () => {
        setShowNovuRadionicu(false);
        fetchRadionice(); 
      };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <> 
        <Button variant="outlined" style={{ border: "1px solid orange", color: "orange" , marginRight:'20px'}} className='button-add0' onClick={handleOpenClick}>
                + Add new workshop
          </Button> 
         <Button variant="outlined" onClick={handleOpenDialog}>Add a theme of workshop</Button>
            <TablicaRadionice radionice={radionice} isLoading={isLoading} setIsLoading={setIsLoading} fetchRadionice={fetchRadionice} /> <br />
            
            
            {showNovuRadionicu && <DodavanjeRadionice onClose={handleCloseClick} />}
            
            
            {openDialog && <DodavanjeTemeRadionice open={openDialog} onClose={handleCloseDialog} />}
        </>
    );
}

export default Radionice;
