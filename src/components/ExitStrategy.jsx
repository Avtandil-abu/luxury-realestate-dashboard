import React, { useState } from 'react';
import { LogOut, Info, TrendingUp } from 'lucide-react';

const ExitStrategy = ({ years, price, growth, mortgageRate, downPayment, lang = 'KA', currSym }) => {
    const [showInfo, setShowInfo] = useState(false);

    const INFLATION_RATE = 0.035; // 3.5%

    // დინამიური წლის გამოთვლა - უფრო რეალისტური ლოგიკით
    const calculateOptimalYear = () => {
        let baseYear = Math.round(years * 0.5); // ვიწყებთ შუა პერიოდიდან
        if (mortgageRate > 12) baseYear += 2;   // ძვირი იპოთეკა = უფრო გვიან გამოსვლა
        if (mortgageRate < 9) baseYear -= 1;    // იაფი იპოთეკა = უფრო ადრე გამოსვლა

        // ვზღუდავთ, რომ 5-ზე ნაკლები და 12-ზე მეტი არ დაწეროს (ოქროს შუალედი)
        return Math.min(Math.max(baseYear, 5), 12);
    };

    const optimalYear = calculateOptimalYear();

    const projectedPrice = price * Math.pow(1 + (growth / 100), optimalYear);
    const initialLoan = price * (1 - (downPayment / 100));
    const remainingDebt = initialLoan * (1 - (optimalYear / years));
    const nominalEquity = projectedPrice - remainingDebt;
    const realEquityToday = nominalEquity / Math.pow(1 + INFLATION_RATE, optimalYear);

    const content = {
        KA: {
            title: "გასვლის სტრატეგია (EXIT)",
            optYear: "საუკეთესო დრო რეინვესტირებისთვის",
            equityLabel: `რეალური წილი (Equity) მე-${optimalYear} წელს`,
            advice: "გათვალისწინებულია ინფლაცია (3.5%), რათა დაინახოთ კაპიტალის რეალური მსყიდველობითი უნარი დღევანდელი საზომით.",
            peakLabel: "ინვესტიციის ეფექტურობის პიკი",
            unit: "წელი"
        },
        EN: {
            title: "Exit Strategy (EXIT)",
            optYear: "Optimal Reinvestment Time",
            equityLabel: `Real Equity in Year ${optimalYear}`,
            advice: "Adjusted for 3.5% inflation to show the real purchasing power of your future capital in today's terms.",
            peakLabel: "Peak Investment Efficiency",
            unit: "Year"
        },
        RU: {
            title: "Стратегия выхода (EXIT)",
            optYear: "Лучшее время для реинвестирования",
            equityLabel: `Реальная доля (Equity) на ${optimalYear}-й год`,
            advice: "Учтена инфляция (3.5%), чтобы показать реальную покупательную способность капитала в сегодняшних ценах.",
            peakLabel: "Пик эффективности инвестиции",
            unit: "год"
        }
    }[lang.toUpperCase()] || content.EN;

    return (
        <div style={{
            backgroundColor: 'rgba(37, 99, 235, 0.05)', borderRadius: '30px', padding: '24px',
            border: '1px solid rgba(37, 99, 235, 0.2)', display: 'flex', flexDirection: 'column', gap: '15px',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2563eb' }}>
                    <LogOut size={20} />
                    <span style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {content.title}
                    </span>
                </div>
                <div style={{ position: 'relative' }}>
                    <Info
                        size={16}
                        style={{ color: '#2563eb', cursor: 'help', opacity: 0.6 }}
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                    />
                    {showInfo && (
                        <div style={{
                            position: 'absolute', bottom: '130%', right: 0, backgroundColor: '#1a1a1a',
                            color: '#ccc', padding: '12px', borderRadius: '12px', width: '220px',
                            fontSize: '11px', border: '1px solid #2563eb', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            pointerEvents: 'none'
                        }}>
                            {content.advice}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p style={{ color: '#999', fontSize: '12px', margin: '0 0 6px 0' }}>{content.optYear}</p>
                    <h4 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', margin: 0 }}>
                        {optimalYear} {content.unit}
                    </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#999', fontSize: '12px', margin: '0 0 6px 0' }}>{content.equityLabel}</p>
                    <h4 style={{ color: '#4ade80', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
                        {currSym}{Math.round(realEquityToday).toLocaleString()}
                    </h4>
                </div>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px', backgroundColor: 'rgba(74, 222, 128, 0.05)',
                borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.1)'
            }}>
                <TrendingUp size={14} color="#4ade80" />
                <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 'bold' }}>
                    {content.peakLabel}
                </span>
            </div>
        </div>
    );
};

export default ExitStrategy;