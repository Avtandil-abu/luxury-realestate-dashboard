import React from 'react';
import { TrendingUp } from 'lucide-react';

const ComparisonModule = ({ price, rent, years, downPayment, stats, currSym, lang }) => {
    // პროფესიონალური მიდგომა: ლარზე საშუალო დეპოზიტი 10%, დოლარზე 2%
    // ვიყენებთ currSym-ს ($, ₾) ვალუტის ამოსაცნობად
    const depositRate = (currSym === '₾') ? 0.10 : 0.02;

    const alternateInvestment = (price * (downPayment / 100)) * Math.pow(1 + depositRate, years);
    const totalRentPaid = rent * 12 * years;
    const depPlusRent = alternateInvestment - totalRentPaid;
    const isPurchaseBetter = stats.totalProfit > depPlusRent;

    // სამენოვანი თარგმანი
    const content = {
        ka: {
            title: 'ინვესტიციის ალტერნატივა',
            buy: 'ყიდვის სცენარი',
            dep: 'დეპოზიტი + ქირა',
            buyDesc: `წმინდა მოგება ${years} წლის შემდეგ`,
            depDesc: 'შედეგი ბანკში დაზოგვით',
            yes: '✓ ბინის ყიდვა უფრო მომგებიანია',
            no: '✕ ფულის ბანკში დება სჯობს'
        },
        en: {
            title: 'Investment Alternative',
            buy: 'Purchase Scenario',
            dep: 'Deposit + Rent',
            buyDesc: `Net profit after ${years} years`,
            depDesc: 'Result if saved in bank',
            yes: '✓ Buying an apartment is more profitable',
            no: '✕ Keeping money in bank is better'
        },
        ru: {
            title: 'Альтернатива инвестиции',
            buy: 'Сценарий покупки',
            dep: 'Депозит + Аренда',
            buyDesc: `Чистая прибыль через ${years} лет`,
            depDesc: 'Результат при сбережении в банке',
            yes: '✓ Покупка квартиры более выгодна',
            no: '✕ Лучше держать деньги в банке'
        }
    }[lang || 'ka'];

    return (
        <div style={{
            padding: '35px',
            borderRadius: '40px',
            background: 'linear-gradient(145deg, #0a0a0a, #111)',
            border: '1px solid #222',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '520px'
        }}>
            <div>
                <h3 style={{ color: '#D4AF37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px' }}>
                    <TrendingUp size={24} /> {content.title}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ padding: '25px', borderRadius: '25px', backgroundColor: '#070707', border: '1px solid #2563eb44', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>{content.buy}</p>
                        <div style={{ fontSize: '30px', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>{currSym}{Math.round(stats.totalProfit).toLocaleString()}</div>
                        <p style={{ fontSize: '11px', color: '#888' }}>{content.buyDesc}</p>
                    </div>

                    <div style={{ padding: '25px', borderRadius: '25px', backgroundColor: '#070707', border: '1px solid #D4AF3744', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>{content.dep}</p>
                        <div style={{ fontSize: '30px', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>{currSym}{Math.round(depPlusRent).toLocaleString()}</div>
                        <p style={{ fontSize: '11px', color: '#888' }}>{content.depDesc}</p>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '30px', padding: '20px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)',
                textAlign: 'center', border: `1px dashed ${isPurchaseBetter ? '#4ade8044' : '#f8717144'}`
            }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: isPurchaseBetter ? '#4ade80' : '#f87171', margin: 0 }}>
                    {isPurchaseBetter ? content.yes : content.no}
                </p>
            </div>
        </div>
    );
};

export default ComparisonModule;