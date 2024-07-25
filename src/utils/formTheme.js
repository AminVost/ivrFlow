// theme.js
import { Padding, PaddingOutlined } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#313134',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': { color: '#ffffff3d' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: '#1976d3' },
            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
            '& input': { color: 'white', Padding: 0 },
            '& textarea': { color: 'white' },
            backgroundColor: '#313134',
            '&:hover': { backgroundColor: '#39393d' },
          },
          marginBottom: 13,
          width: '100%'
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: '#313134',
          '& .MuiSvgIcon-root': { color: '#ffffff3d' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff3d',
          '&.Mui-focused': {
            color: '#1976d2',
            // backgroundColor: '#1976d2',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff26',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: 13,
          width: '100%'
          },          
        },
      },
  },
});

export default theme;
