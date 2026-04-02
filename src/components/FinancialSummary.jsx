import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../constants/Translations';

const FinancialSummary = ({ totalProfit, appreciation, netRent, safeYears, monthlyMortgage, loan }) => {
    const { lang, currency } = useApp();
    const t = translations[lang];
    const currSym = currency === 'GEL' ? '₾' : '$';

    const totalRentalIncome = netRent * 12 * safeYears;
    const totalBankInterest = (monthlyMortgage * 240) - loan; // გათვლილია 20 წელზე

    return (
        <div style={{ padding: '20px', backgroundColor: '#0a0a0a', borderRadius: '30px', border: '1px solid #1a1a1a', marginTop: '20px' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '14px', textAlign: 'center', marginBottom: '25px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t.finSummary} ({safeYears} {t.years})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                    <span>{t.totalRent}</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{currSym}{Math.round(totalRentalIncome).toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                    <span>{t.appreciation} (Appreciation)</span>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{currSym}{Math.round(appreciation).toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                    <span>{t.bankInterest} ({safeYears} {t.years})</span>
                    <span style={{ color: '#f87171', fontWeight: 'bold' }}>{currSym}{Math.round(totalBankInterest * (safeYears / 20)).toLocaleString()}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: '#222', margin: '10px 0' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#D4AF37', fontWeight: '900' }}>{t.netReturn}</span>
                    <span style={{ color: '#D4AF37', fontSize: '24px', fontWeight: '900' }}>{currSym}{Math.round(totalProfit).toLocaleString()}</span>
                </div>
                <p style={{ fontSize: '10px', color: '#444', textAlign: 'right', marginTop: '-10px' }}>პერიოდის ბოლოს (Net)</p>
            </div>
        </div>
    );
};

export default FinancialSummary;