import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from './Theme/index';
import { ModeProvider } from './Context/ModeProvider';
ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <ChakraProvider theme={Theme}>
        <App />
      </ChakraProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();