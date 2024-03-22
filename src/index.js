import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from './Theme/index'
import { ModeProvider } from './Context/ModeProvider';
import { BalanceProvider } from './Context/BalanceProvider';
import { CurrencyProvider } from './Context/CurrencyProvider';

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <BalanceProvider>
        <CurrencyProvider>
          <ChakraProvider theme={Theme}>
            <App />
          </ChakraProvider>
        </CurrencyProvider>
      </BalanceProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();