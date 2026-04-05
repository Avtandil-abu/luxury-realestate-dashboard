// src/utils/LogicEngine.jsx

export const calculateInvestment = (inputs, currency, currentRate) => {
    const rate = currency === 'GEL' ? currentRate : 1;

    // 1. მონაცემების მომზადება
    const price = Number(inputs.price);
    const initialMonthlyRent = Number(inputs.rent); // საწყისი ქირა
    const rentGrowth = Number(inputs.rentGrowth) / 100; // ქირის ზრდა (პროცენტებში)
    const growth = Number(inputs.growth) / 100; // ბინის ფასის ზრდა
    const years = Number(inputs.years);
    const taxRate = Number(inputs.tax) / 100;

    const downPaymentPercent = Number(inputs.downPayment) / 100;
    const loan = price * (1 - downPaymentPercent);
    const monthlyMortgageRate = (Number(inputs.mortgageRate) / 100) / 12;

    // იპოთეკის ყოველთვიური გადასახადი (20 წლიანი სტანდარტით)
    const monthlyMortgage = (loan > 0 && monthlyMortgageRate > 0)
        ? (loan * monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, 240)) / (Math.pow(1 + monthlyMortgageRate, 240) - 1)
        : 0;

    // 2. დინამიური გათვლა წლების მიხედვით (რომ ქირის ზრდა აისახოს)
    let totalNetRentIncome = 0;

    for (let i = 1; i <= years; i++) {
        // ქირა იზრდება ყოველ წელს rentGrowth-ით
        const currentYearMonthlyRent = initialMonthlyRent * Math.pow(1 + rentGrowth, i - 1);
        const netYearlyRent = (currentYearMonthlyRent * 12) * (1 - taxRate);

        // ვაკლებთ იპოთეკის წლიურ გადასახადს
        totalNetRentIncome += (netYearlyRent - (monthlyMortgage * 12));
    }

    const finalPrice = price * Math.pow(1 + growth, years);
    const appreciation = finalPrice - price;

    // მთლიანი მოგება = ფასის მატება + დაგროვილი ქირა (მინუს ხარჯები)
    const totalProfit = appreciation + totalNetRentIncome;
    const investedCapital = price * downPaymentPercent;

    // 3. კონვერტაცია და დაბრუნება
    return {
        totalProfit: totalProfit * rate,
        // მიმდინარე (პირველი წლის) Cashflow-ს ვაჩვენებთ რეზულტატებში
        monthlyCashflow: (initialMonthlyRent * (1 - taxRate) - monthlyMortgage) * rate,
        monthlyMortgage: monthlyMortgage * rate,
        investedCapital: investedCapital * rate,
        finalPrice: finalPrice * rate,
        appreciation: appreciation * rate,
        rent: initialMonthlyRent * rate,
        price: price * rate,
        roi: investedCapital > 0 ? Math.round((totalProfit / investedCapital) * 100) : 0,
        breakeven: (initialMonthlyRent * (1 - taxRate) - monthlyMortgage) > 0
            ? (investedCapital / ((initialMonthlyRent * (1 - taxRate) - monthlyMortgage) * 12)).toFixed(1)
            : "∞"
    };
};