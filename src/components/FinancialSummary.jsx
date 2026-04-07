import React from 'react';
import { PieChart, Activity } from 'lucide-react';

const FinancialSummary = ({ totalProfit, appreciation, netRent, loan, totalMortgage, years, lang, currSym }) => {
    // უსაფრთხოების შემოწმება, რომ NaN არ ამოაგდოს
    const safeYears = years || 1;
    const safeProfit = totalProfit || 0;
    const safeAppreciation = appreciation || 0;
    const safeMortgage = totalMortgage || 0;
    const safeRent = netRent || 0;

    // ეფექტურობის გამოთვლა (დაცულია NaN-სგან)
    const annualReturn = safeYears > 0
        ? ((safeProfit / (safeProfit - safeAppreciation + (loan || 0))) / safeYears * 100).toFixed(1)
        : "0.0";

    // სამენოვანი თარგმანი
    const content = {
        ka: {
            title: `ფინანსური რეზიუმე (${safeYears} წელი)`,
            rent: 'ჯამური იჯარა',
            cap: 'კაპიტალის ნამატი',
            bank: 'ბანკის პროცენტი',
            net: 'წმინდა ამონაგები',
            note: '*ყველა ხარჯის გათვალისწინებით',
            eff: 'პროექტის ეფექტურობა',
            yield: 'წლიური უკუგება'
        },
        en: {
            title: `Financial Summary (${safeYears} Years)`,
            rent: 'Total Rental Income',
            cap: 'Capital Appreciation',
            bank: 'Bank Interest',
            net: 'Net Return',
            note: '*After all expenses',
            eff: 'Project Efficiency',
            yield: 'Annual Yield'
        },
        ru: {
            title: `Финансовое резюме (${safeYears} лет)`,
            rent: 'Общий доход от аренды',
            cap: 'Прирост капитала',
            bank: 'Проценты банка',
            net: 'Чистая прибыль',
            note: '*С учетом всех расходов',
            eff: 'Эффективность проекта',
            yield: 'Годовая доходность'
        }
    }[lang || 'ka'];

    return (
        <div style={{
            padding: '35px', borderRadius: '40px', background: 'linear-gradient(145deg, #0a0a0a, #111)',
            border: '1px solid #222', width: '100%', boxSizing: 'border-box', display: 'flex',
            flexDirection: 'column', minHeight: '520px'
        }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px' }}>
                <PieChart size={24} /> {content.title}
            </h3>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                    <span style={{ color: '#999' }}>{content.rent}</span>
                    <span style={{ fontWeight: 'bold' }}>{currSym}{Math.round(safeRent * 12 * safeYears).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                    <span style={{ color: '#999' }}>{content.cap}</span>
                    <span style={{ fontWeight: 'bold', color: '#4ade80' }}>+{currSym}{Math.round(safeAppreciation).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                    <span style={{ color: '#999' }}>{content.bank}</span>
                    <span style={{ fontWeight: 'bold', color: '#f87171' }}>-{currSym}{Math.round(safeMortgage).toLocaleString()}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: '#222', margin: '15px 0' }} />

                <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>{content.net}</span>
                    <div style={{ fontSize: '38px', fontWeight: '900', color: '#D4AF37', marginTop: '5px' }}>
                        {currSym}{Math.round(safeProfit).toLocaleString()}
                    </div>
                    <p style={{ fontSize: '12px', color: '#7b7a7a', marginTop: '8px' }}>{content.note}</p>
                </div>
            </div>

            <div style={{
                marginTop: '25px', padding: '18px', backgroundColor: '#070707', borderRadius: '22px',
                border: '1px solid #222', display: 'flex', alignItems: 'center', gap: '15px'
            }}>
                <div style={{ backgroundColor: '#D4AF3722', padding: '12px', borderRadius: '14px' }}>
                    <Activity size={22} color="#D4AF37" />
                </div>
                <div>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0, textTransform: 'uppercase' }}>{content.eff}</p>
                    <p style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold', margin: 0 }}>
                        {annualReturn !== "NaN" ? annualReturn : "0.0"}% {content.yield}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinancialSummary;