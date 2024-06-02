import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../firebase';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(1),
  '& .MuiRadio-root': {
    display: 'none',
  },
  '& .MuiTypography-root': {
    backgroundColor: '#2b2b2b', 
    color: '#ffffff',
    borderRadius: '20px', 
    padding: theme.spacing(1, 2),
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  '& .MuiTypography-root:hover': {
    backgroundColor: '#3a3a3a', 
  },
  '& .MuiRadio-root.Mui-checked + .MuiTypography-root': {
    backgroundColor: '#d3d3d3',
    color: '#000000', 
  },
}));

function FilterTeme(props) {
  const [teme, setTeme] = useState([]);

  useEffect(() => {
    const fetchTeme = async () => {
      const temaCollection = collection(firestore, 'teme');
      const temaSnapshot = await getDocs(temaCollection);
      const temaList = temaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeme(temaList);
    };

    fetchTeme();
  }, []);

  const handleChange = (e) => {
    props.setFilterTeme(e.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.filterTeme}
        onChange={handleChange}
      >
        <StyledFormControlLabel value="all" control={<Radio />} label="All" />
        {teme.map((tema) => (
          <StyledFormControlLabel value={tema.id} control={<Radio />} label={tema.tema} key={tema.id} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default FilterTeme;
