import React, { useState } from 'react';
import { Info } from 'lucide-react';

const ResultCard = ({ label, value, color, tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '24px',
            border: '1px solid #222',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>{label}</p>

                {tooltip && (
                    <div style={{ position: 'relative' }}>
                        <Info
                            size={14}
                            style={{ color: '#444', cursor: 'pointer' }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />
                        {showTooltip && (
                            <div style={{
                                position: 'absolute', bottom: '100%', right: '0',
                                backgroundColor: '#1a1a1a', color: '#bbb', padding: '12px',
                                borderRadius: '12px', width: '200px', fontSize: '11px',
                                border: '1px solid #D4AF37', zIndex: 100, marginBottom: '10px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                lineHeight: '1.4'
                            }}>
                                {tooltip}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <h3 style={{ color: color, fontSize: '24px', fontWeight: '900', marginTop: '10px', marginBottom: 0 }}>
                ${value.toLocaleString()}
            </h3>
        </div>
    );
};

export default ResultCard;