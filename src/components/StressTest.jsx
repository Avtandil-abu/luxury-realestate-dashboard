import React, { useState } from 'react';
import { ShieldAlert, ArrowDownCircle, AlertTriangle, TrendingUp, Info } from 'lucide-react';

const StressTooltip = ({ text }) => {
    const [show, setShow] = useState(false);
    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '6px' }}>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                style={{
                    cursor: 'help', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.4)',
                    borderRadius: '50%', width: '14px', height: '14px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold'
                }}
            >i</div>
            {show && (
                <div style={{
                    position: 'absolute', bottom: '145%', left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: '#1a1a1a', color: '#D4AF37', padding: '10px', borderRadius: '10px',
                    width: '180px', fontSize: '11px', border: '1px solid #D4AF37', zIndex: 9999,
                    boxShadow: '0 5px 20px rgba(0,0,0,0.5)', lineHeight: '1.4', pointerEvents: 'none', // აი ეს არის მთავარი წამალი ციმციმისთვის!
                    textAlign: 'left'
                }}>
                    {text}
                    <div style={{
                        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                        borderWidth: '5px', borderStyle: 'solid',
                        borderColor: '#D4AF37 transparent transparent transparent'
                    }}></div>
                </div>
            )}
        </div>
    );
};

const StressTest = ({ currentRoi, years, lang = 'KA' }) => {
    const annualRoi = currentRoi / (years || 1);
    const rentDropAnnual = (annualRoi - 1.2).toFixed(1);
    const marketCrashAnnual = (annualRoi * 0.6).toFixed(1);
    const mortgageSpikeAnnual = (annualRoi - 1.8).toFixed(1);

    const translations = {
        KA: {
            title: "სტრეს-ტესტი (Stress Test)",
            desc: "როგორ შეიცვლება ROI ბაზრის რყევებისას:",
            scenario1: "ქირის კლება",
            scenario2: "სტაგნაცია",
            scenario3: "იპოთეკის ზრდა",
            impact: "წლიური ROI",
            tt1: "თუ ბაზარზე ბინების ჭარბი მიწოდებაა და ქირა 10%-ით შემცირდება.",
            tt2: "თუ ბაზარი გაჩერდა და ბინის ფასი აღარ იზრდება ისე, როგორც ველოდით.",
            tt3: "თუ ბანკმა საპროცენტო განაკვეთი 2%-ით გაზარდა (რეფინანსირების გამო)."
        },
        EN: {
            title: "Stress Test (Scenarios)",
            desc: "How ROI changes during market shifts:",
            scenario1: "Rent Drop",
            scenario2: "Stagnation",
            scenario3: "Rate Hike",
            impact: "Annual ROI",
            tt1: "If the market is oversupplied and rent prices drop by 10%.",
            tt2: "If the property value stops growing as expected due to market stagnation.",
            tt3: "If the bank increases interest rates by 2% due to refinancing changes."
        },
        RU: {
            title: "Стресс-тест (Сценарии)",
            desc: "Как изменится ROI при спаде рынка:",
            scenario1: "Спад аренды",
            scenario2: "Стагнация",
            scenario3: "Рост ипотеки",
            impact: "Годовой ROI",
            tt1: "Если арендная плата на рынке снизится на 10%.",
            tt2: "Если цены на жилье перестанут расти из-за стагнации рынка.",
            tt3: "Если банк поднимет процентную ставку на 2%."
        }
    };

    const t = translations[lang.toUpperCase()] || translations.EN;

    const boxStyle = {
        flex: 1, padding: '12px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column',
        gap: '4px', minWidth: '100px'
    };

    return (
        <div style={{
            background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.08), rgba(0, 0, 0, 0))',
            borderRadius: '24px', padding: '20px', border: '1px solid rgba(239, 68, 68, 0.15)', marginTop: '15px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderRadius: '10px', color: '#ef4444' }}>
                    <ShieldAlert size={20} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{t.title}</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '15px' }}>{t.desc}</p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {/* 1. Rent Drop */}
                <div style={boxStyle}>
                    <div style={{ color: '#fbbf24', fontSize: '12px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <ArrowDownCircle size={12} style={{ marginRight: '4px' }} /> {t.scenario1}
                        <StressTooltip text={t.tt1} />
                    </div>
                    <div style={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}>
                        {rentDropAnnual}% <span style={{ fontSize: '10px', color: '#fbbf24', opacity: 0.7, marginLeft: '4px' }}>{t.impact}</span>
                    </div>
                </div>

                {/* 2. Stagnation */}
                <div style={boxStyle}>
                    <div style={{ color: '#ef4444', fontSize: '12px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <AlertTriangle size={12} style={{ marginRight: '4px' }} /> {t.scenario2}
                        <StressTooltip text={t.tt2} />
                    </div>
                    <div style={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}>
                        {marketCrashAnnual}% <span style={{ fontSize: '10px', color: '#ef4444', opacity: 0.7, marginLeft: '4px' }}>{t.impact}</span>
                    </div>
                </div>

                {/* 3. Rate Hike */}
                <div style={boxStyle}>
                    <div style={{ color: '#60a5fa', fontSize: '12px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <TrendingUp size={12} style={{ marginRight: '4px' }} /> {t.scenario3}
                        <StressTooltip text={t.tt3} />
                    </div>
                    <div style={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}>
                        {mortgageSpikeAnnual}% <span style={{ fontSize: '10px', color: '#60a5fa', opacity: 0.7, marginLeft: '4px' }}>{t.impact}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StressTest;