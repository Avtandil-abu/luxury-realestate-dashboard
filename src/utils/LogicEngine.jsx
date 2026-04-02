// src/utils/LogicEngine.jsx

export const calculateInvestment = (inputs, currency, currentRate) => {
    // აი აქ ვიყენებთ API-დან წამოღებულ რეალურ კურსს
    const rate = currency === 'GEL' ? currentRate : 1;

    // 1. გამოთვლები ყოველთვის ხდება საბაზისო ციფრებით (დოლარში)
    const price = Number(inputs.price);
    const rent = Number(inputs.rent);
    const loan = price * (1 - Number(inputs.downPayment) / 100);
    const monthlyRate = (Number(inputs.mortgageRate) / 100) / 12;

    // იპოთეკა
    const monthlyMortgage = (loan > 0 && monthlyRate > 0)
        ? (loan * monthlyRate * Math.pow(1 + monthlyRate, 240)) / (Math.pow(1 + monthlyRate, 240) - 1)
        : 0;

    const netRent = rent * (1 - Number(inputs.tax) / 100);
    const monthlyCashflow = netRent - monthlyMortgage;
    const appreciation = price * Math.pow(1 + Number(inputs.growth) / 100, Number(inputs.years)) - price;
    const totalProfit = appreciation + (monthlyCashflow * 12 * Number(inputs.years));
    const investedCapital = price * (Number(inputs.downPayment) / 100);

    // 2. აი აქ ხდება რეალური კონვერტაცია გამოსატანად
    return {
        totalProfit: totalProfit * rate,
        monthlyCashflow: monthlyCashflow * rate,
        monthlyMortgage: monthlyMortgage * rate,
        investedCapital: investedCapital * rate,
        finalPrice: (price + appreciation) * rate,
        appreciation: appreciation * rate,
        rent: rent * rate,
        price: price * rate,
        roi: investedCapital > 0 ? Math.round((totalProfit / investedCapital) * 100) : 0,
        breakeven: monthlyCashflow > 0 ? (investedCapital / (monthlyCashflow * 12)).toFixed(1) : "∞"
    };
};