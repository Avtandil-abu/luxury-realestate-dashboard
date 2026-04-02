import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../constants/Translations';

const SmartInsights = ({ roi }) => {
    const { lang } = useApp();
    const t = translations[lang];

    const isLow = roi < 5;
    const mainColor = isLow ? '#f87171' : '#4ade80';
    const bgColor = isLow ? 'rgba(248, 113, 113, 0.1)' : 'rgba(74, 222, 128, 0.05)';

    const getMessage = () => {
        if (roi > 15) return t.highRoi;
        if (roi > 5) return t.moderateRoi;
        return t.lowRoi;
    };

    return (
        <div style={{
            backgroundColor: bgColor,
            border: `1px solid ${mainColor}33`,
            padding: '20px',
            borderRadius: '25px',
            display: 'flex',
            gap: '15px',
            alignItems: 'flex-start'
        }}>
            <div style={{ backgroundColor: mainColor, padding: '10px', borderRadius: '12px', color: '#000' }}>
                {isLow ? <AlertCircle size={20} /> : <TrendingUp size={20} />}
            </div>
            <div>
                <h4 style={{ color: mainColor, fontSize: '14px', fontWeight: '900', margin: '0 0 5px 0' }}>
                    {t.smartInsightTitle}:
                </h4>
                <p style={{ color: isLow ? '#fca5a5' : '#ccc', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                    {getMessage()}
                </p>
            </div>
        </div>
    );
};

export default SmartInsights;