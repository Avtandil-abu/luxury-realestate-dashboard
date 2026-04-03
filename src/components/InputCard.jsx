import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

const InputCard = ({ label, icon, value, setter, unit, min, max, tooltip, step }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    const increment = () => setter(prev => Math.min(max, (Number(prev) || 0) + step));
    const decrement = () => setter(prev => Math.max(min, (Number(prev) || 0) - step));

    return (
        <div
            className="interactive-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: '#111',
                padding: '20px 24px',
                borderRadius: '24px',
                marginBottom: '16px',
                border: isHovered ? '1px solid #D4AF37' : '1px solid #222',
                position: 'relative',
                transition: 'all 0.3s ease'
            }}
        >
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
                                <ChevronUp size={18} className="icon-btn" onClick={increment} style={{ cursor: 'pointer', color: '#444' }} />
                                <ChevronDown size={18} className="icon-btn" onClick={decrement} style={{ cursor: 'pointer', color: '#444' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* აქ დაემატა ის წრე (i)-ს გარშემო */}
                    <div
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        style={{
                            cursor: 'help',
                            color: '#D4AF37',
                            border: '1.5px solid #D4AF37',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            opacity: 0.8
                        }}
                    >
                        i
                    </div>

                    {showTooltip && (
                        <div style={{
                            position: 'absolute', bottom: '100%', right: '0',
                            backgroundColor: '#1a1a1a', color: '#bbb', padding: '12px',
                            borderRadius: '12px', width: '240px', fontSize: '12px',
                            border: '1px solid #D4AF37', zIndex: 100, marginBottom: '10px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
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
                step={step}
                value={Number(value) || 0}
                onChange={(e) => setter(Number(e.target.value))}
                className="golden-slider"
                style={{ width: '100%', marginTop: '10px', accentColor: '#D4AF37' }}
            />
        </div>
    );
};

export default InputCard;