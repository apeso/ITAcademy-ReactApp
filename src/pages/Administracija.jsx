import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAuth } from '../context/UserContext';
import '../App.css';

import Organizacije from '../components/Administracija/AdminOrganizacija/Organizacije';
import Radionice from "../components/Administracija/AdminRadionica/Radionice";
import Predavaci from "../components/Administracija/AdminPredavaca/Predavaci";
import { Navigate } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Administracija() {
  const {isAdmin }=useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className='tab'>
      {!isAdmin && <Navigate replace to="/" />}
      <Box sx={{ width: '100%',margin:'20px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            
            aria-label="basic tabs example"
          >
            <Tab  className='tab'  label="Workshops" {...a11yProps(0)} />
            <Tab className='tab'  label="Tutors" {...a11yProps(1)} />
            <Tab className='tab' label="Organizations" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Radionice></Radionice>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Predavaci></Predavaci>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Organizacije></Organizacije>
        </CustomTabPanel>
      </Box>
    </div>

  );
}