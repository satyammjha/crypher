import { createContext, useState } from 'react';


const BalanceContext = createContext()

const BalanceProvider = ({ children }) => {
    const [portfolioBalance, setPortfolioBalance] = useState(5);
    const [walletBalance, setWalletBalance] = useState(0);
    const [btcBalance, setBtcBalance] = useState(0);

    return (
        <BalanceContext.Provider value={{ portfolioBalance, setPortfolioBalance, walletBalance, setWalletBalance, btcBalance, setBtcBalance }}>
            {children}
        </BalanceContext.Provider>
    )
}

export { BalanceContext, BalanceProvider }