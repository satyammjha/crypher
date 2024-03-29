import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from './Theme/index'
import { ModeProvider } from './Context/ModeProvider';
import { BalanceProvider } from './Context/BalanceProvider';
import { CurrencyProvider } from './Context/CurrencyProvider';
import { UserProvider } from './Context/UserProvider';

const root = document.getElementById('root');

const app = (
  <React.StrictMode>
    <ModeProvider>
      <BalanceProvider>
        <CurrencyProvider>
          <UserProvider>
            <ChakraProvider theme={Theme}>
              <App />
            </ChakraProvider>
          </UserProvider>
        </CurrencyProvider>
      </BalanceProvider>
    </ModeProvider>
  </React.StrictMode>
);


const rootElement = ReactDOM.createRoot(root);
rootElement.render(app);

reportWebVitals();