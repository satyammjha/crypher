import React, { createContext, useState } from 'react';

const ModeContext = createContext();

const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    return (

        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export { ModeContext, ModeProvider };