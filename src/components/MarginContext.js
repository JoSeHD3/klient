import React, {createContext, useState, useContext} from 'react';

const MarginContext = createContext();

export const MarginProvider = ({children}) => {
    const [marginLeft, setMarginLeft] = useState('64px');
    
    return (
        <MarginContext.Provider value={{marginLeft, setMarginLeft}}>
            {children}
        </MarginContext.Provider>
    );
};

export const useMargin = () => {
    const context = useContext(MarginContext);
    if(!context) {
        throw new Error('useMargin must be used within a MarginProvider');
    }
    return context;
}