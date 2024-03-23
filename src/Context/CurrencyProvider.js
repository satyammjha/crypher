import { createContext, useState } from 'react'

const currencyContext = createContext();


const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('inr');
    return (
        <currencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </currencyContext.Provider>
    )
}

export { CurrencyProvider, currencyContext }
