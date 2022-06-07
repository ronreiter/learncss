import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CssBaseline} from '@mui/material';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline/>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
