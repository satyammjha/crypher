import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from './Theme/index'
import { ModeProvider } from './Context/ModeProvider';
import { BalanceProvider } from './Context/BalanceProvider';

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <BalanceProvider>
        <ChakraProvider theme={Theme}>
          <App />
        </ChakraProvider>
      </BalanceProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();