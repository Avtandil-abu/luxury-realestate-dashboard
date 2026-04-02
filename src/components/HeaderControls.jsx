import React from 'react';
import { useApp } from '../context/AppContext';

const HeaderControls = () => {
    const { lang, setLang, currency, setCurrency } = useApp();

    const controlStyle = {
        display: 'flex',
        gap: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '5px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const btnStyle = (active) => ({
        padding: '5px 10px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: active ? '#D4AF37' : 'transparent',
        color: active ? '#000' : '#888',
        fontSize: '11px',
        fontWeight: '900',
        cursor: 'pointer',
        transition: '0.3s'
    });

    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={controlStyle}>
                {['ka', 'en', 'ru'].map(l => (
                    <button key={l} onClick={() => setLang(l)} style={btnStyle(lang === l)}>
                        {l.toUpperCase()}
                    </button>
                ))}
            </div>
            <div style={controlStyle}>
                {['USD', 'GEL'].map(c => (
                    <button key={c} onClick={() => setCurrency(c)} style={btnStyle(currency === c)}>
                        {c === 'USD' ? '$' : '₾'}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeaderControls;