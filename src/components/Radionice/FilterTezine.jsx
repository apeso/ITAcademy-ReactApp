import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  backgroundColor: '#2C2C2C',
  borderRadius: '8px',
  padding: '16px',
  color: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

const StyledFormLabel = styled(FormLabel)({
  color: 'white',
  fontWeight: 'bold',
  marginBottom: '8px',
  fontSize: '1.2rem',  
});

const StyledFormControlLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    color: 'white',
  },
  '& .MuiRadio-root': {
    color: '#90CAF9',
    paddingLeft:'10px',
  },
  '& .Mui-checked': {
    color: '#2196F3',
  },
});

function FilterTezine(props) {
  const tezine = ["Junior", "Mid", "Senior"];
  
  const handleChange = (e) => {
    props.setFilterTezine(e.target.value);
  };

  return (
    <StyledFormControl>
      <StyledFormLabel id="demo-controlled-radio-buttons-group">Experience level</StyledFormLabel>
      
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.filterTezine}
        onChange={handleChange}
      >
        <StyledFormControlLabel value={"all"} control={<Radio />} label={'All workshops'} key={'1'} />
        {tezine.map((tezine) => (
            <StyledFormControlLabel key={tezine} value={tezine} control={<Radio />} label={tezine} />
        ))}
      </RadioGroup>
    </StyledFormControl>
  );
}

export default FilterTezine;
