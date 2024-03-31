import { createContext, useState } from 'react'

const currencyContext = createContext();


const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('inr');
    const [watchlist, setWatchList] = useState([]);
    return (
        <currencyContext.Provider value={{ currency, setCurrency, watchlist, setWatchList }}>
            {children}
        </currencyContext.Provider>
    )
}

export { CurrencyProvider, currencyContext }