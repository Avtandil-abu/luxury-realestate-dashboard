import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

const InputCard = ({ label, icon, value, setter, unit, min, max, tooltip, step }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setter('');
        } else {
            const num = Number(val.replace(/[^0-9.]/g, ''));
            if (!isNaN(num)) setter(num);
        }
    };

    const handleBlur = () => {
        if (value === '' || value === null) setter(0);
    };

    // აქ უკვე ვიყენებთ იმ step-ს, რასაც გარედან გამოვატანთ
    const increment = () => setter(prev => Math.min(max, (Number(prev) || 0) + step));
    const decrement = () => setter(prev => Math.max(min, (Number(prev) || 0) - step));

    return (
        <div className="interactive-card" style={{
            backgroundColor: '#111',
            padding: '20px 24px',
            borderRadius: '24px',
            marginBottom: '16px',
            border: '1px solid #222',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ color: '#D4AF37', backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '10px', borderRadius: '12px' }}>
                        {icon}
                    </div>
                    <div>
                        <p style={{ color: '#D4AF37', fontSize: '11px', margin: 0, fontWeight: '900', textTransform: 'uppercase' }}>{label}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                            <input
                                type="text"
                                value={value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    width: '100px',
                                    outline: 'none'
                                }}
                            />
                            <span style={{ fontSize: '18px', color: '#D4AF37', fontWeight: '900' }}>{unit}</span>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <ChevronUp size={18} className="icon-btn" onClick={increment} style={{ cursor: 'pointer' }} />
                                <ChevronDown size={18} className="icon-btn" onClick={decrement} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <Info
                        size={18}
                        style={{ color: '#444', cursor: 'pointer' }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    />
                    {showTooltip && (
                        <div style={{
                            position: 'absolute', bottom: '100%', right: '0',
                            backgroundColor: '#1a1a1a', color: '#bbb', padding: '12px',
                            borderRadius: '12px', width: '240px', fontSize: '12px',
                            border: '1px solid #D4AF37', zIndex: 100, marginBottom: '10px'
                        }}>
                            {tooltip}
                        </div>
                    )}
                </div>
            </div>

            <input
                type="range"
                min={min}
                max={max}
                step={step} // სლაიდერიც ამ ნაბიჯით იმოძრავებს
                value={Number(value) || 0}
                onChange={(e) => setter(Number(e.target.value))}
                className="golden-slider"
                style={{ width: '100%', marginTop: '10px' }}
            />
        </div>
    );
};

export default InputCard;