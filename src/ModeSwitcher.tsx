import {
  useColorScheme,
} from '@mui/material/styles';
import React, {useEffect} from 'react';
import {Button, SxProps, useMediaQuery} from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';

const ModeSwitcher = ({sx} : {sx?: SxProps}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const {mode, setMode} = useColorScheme();

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [setMode, prefersDarkMode])

  return (
    <Button
      size="small"
      sx={sx}
      onClick={toggleColorMode}
      variant="contained"
      startIcon={mode === 'dark' ? <Brightness7/> : <Brightness4/>}
    >
      {mode} mode
    </Button>
  );

};

export default ModeSwitcher;