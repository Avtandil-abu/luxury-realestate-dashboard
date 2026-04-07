// src/utils/LogicEngine.jsx

export const calculateInvestment = (inputs, currency, currentRate) => {
    const rate = currency === 'GEL' ? currentRate : 1;

    // 1. მონაცემების მომზადება
    const price = Number(inputs.price);
    const initialMonthlyRent = Number(inputs.rent);
    const rentGrowth = Number(inputs.rentGrowth) / 100;
    const growth = Number(inputs.growth) / 100;
    const years = Number(inputs.years);
    const taxRate = Number(inputs.tax) / 100;

    const downPaymentPercent = Number(inputs.downPayment) / 100;
    const loan = price * (1 - downPaymentPercent);
    const mortgageRateValue = Number(inputs.mortgageRate) / 100;
    const monthlyMortgageRate = mortgageRateValue / 12;

    // იპოთეკის გადასახადი (20 წლიანი სტანდარტით)
    const monthlyMortgage = (loan > 0 && monthlyMortgageRate > 0)
        ? (loan * monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, 240)) / (Math.pow(1 + monthlyMortgageRate, 240) - 1)
        : 0;

    // 2. დინამიური გათვლა წლების მიხედვით
    let totalNetRentIncome = 0;
    for (let i = 1; i <= years; i++) {
        const currentYearMonthlyRent = initialMonthlyRent * Math.pow(1 + rentGrowth, i - 1);
        const netYearlyRent = (currentYearMonthlyRent * 12) * (1 - taxRate);
        totalNetRentIncome += (netYearlyRent - (monthlyMortgage * 12));
    }

    const finalPrice = price * Math.pow(1 + growth, years);
    const appreciation = finalPrice - price;
    const totalProfit = appreciation + totalNetRentIncome;
    const investedCapital = price * downPaymentPercent;

    // --- პროფესიონალური ბრეიქივენის ლოგიკა ---
    // პირველი წლის სუფთა ქირა
    const firstYearNetRent = (initialMonthlyRent * 12 * (1 - taxRate)) - (monthlyMortgage * 12);
    // ბინის ფასის საშუალო წლიური ზრდა (Appreciation)
    const annualAppreciation = (finalPrice - price) / years;

    // ჯამური წლიური სარგებელი (ქირა + ფასის მატება)
    const annualTotalBenefit = firstYearNetRent + annualAppreciation;

    // თუ ჯამური სარგებელი დადებითია, ვითვლით წლებს. 
    // თუ ზრდაც და ქირაც მინუსშია (რაც თითქმის გამორიცხულია), ვწერთ "∞"
    const calculatedBreakeven = annualTotalBenefit > 0
        ? (investedCapital / annualTotalBenefit).toFixed(1)
        : "∞";

    // 3. დაბრუნება
    return {
        totalProfit: totalProfit * rate,
        monthlyCashflow: (initialMonthlyRent * (1 - taxRate) - monthlyMortgage) * rate,
        monthlyMortgage: monthlyMortgage * rate,
        investedCapital: investedCapital * rate,
        finalPrice: finalPrice * rate,
        appreciation: appreciation * rate,
        rent: initialMonthlyRent * rate,
        price: price * rate,
        roi: investedCapital > 0 ? Math.round((totalProfit / investedCapital) * 100) : 0,
        breakeven: calculatedBreakeven
    };
};