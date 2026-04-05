// src/utils/marketData.js

export const getLiveMarketRates = () => {
    return {
        avgMortgageRate: 11.5, // საშუალო იპოთეკა
        marketGrowth: 3.3,     // RPPI (ბინის ფასის ზრდა)
        rentInflation: 4.6,    // CPI (ქირის ზრდა)
        defaultPrice: 125000,
        defaultRent: 750,
        lastUpdated: new Date().toLocaleDateString()
    };
};