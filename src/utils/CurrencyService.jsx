// src/utils/CurrencyService.jsx

const API_URL = "https://open.er-api.com/v6/latest/USD";

export const fetchExchangeRate = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // ვიღებთ GEL-ის კურსს USD-სთან მიმართებაში
        if (data && data.rates && data.rates.GEL) {
            return data.rates.GEL;
        }
        return 2.7; // თუ ინტერნეტი არ არის ან API-მ გაჭედა, დააბრუნოს "ბექაპ" კურსი
    } catch (error) {
        console.error("კურსის წამოღება ვერ მოხერხდა:", error);
        return 2.7;
    }
};