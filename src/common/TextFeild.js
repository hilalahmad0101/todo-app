import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    // marginTop: 10,
    borderRadius: 25,
  padding: '5px 5px',

    "& fieldset": { // Target the border of the input
      borderColor:'#000', // Default border color
    },
    "&:hover fieldset": {
      borderColor: '#000', // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Border color when focused
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: 10,
    width: "100%",
    height: "100%",
    fontSize: "16px",
    color: '#000',
    fontWeight: "400",
  },
  "& .MuiInputLabel-root": { // Target the label
    color: '#000', // Default label color
    "&.Mui-focused": {
      color: theme.palette.primary.main, // Label color when focused
    }
  }
}));

export default CustomInput;
