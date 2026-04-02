// src/context/AppContext.jsx (სრული ფაილი განახლებული კურსით)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchExchangeRate } from '../utils/CurrencyService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState('ka');
    const [currency, setCurrency] = useState('USD');
    const [rate, setRate] = useState(2.7); // საწყისი კურსი

    // საიტის ჩატვირთვისას მოგვაქვს რეალური კურსი
    useEffect(() => {
        const updateRate = async () => {
            const currentRate = await fetchExchangeRate();
            setRate(currentRate);
            console.log("მიმდინარე კურსი განახლდა:", currentRate);
        };
        updateRate();
    }, []);

    return (
        <AppContext.Provider value={{ lang, setLang, currency, setCurrency, rate }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);