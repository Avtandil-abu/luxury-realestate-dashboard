import React, { useState } from 'react';
import { Info } from 'lucide-react';

const ResultCard = ({ label, value, color, tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div style={{
            backgroundColor: '#111',
            padding: '24px 20px',
            borderRadius: '30px',
            border: '1px solid #222',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '130px', // ოდნავ გავზარდეთ სიმაღლე, რომ სუნთქვა შეეძლოს
            transition: '0.3s ease'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <p style={{
                    color: '#D4AF37',
                    fontSize: '11px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    margin: 0,
                    letterSpacing: '1px'
                }}>
                    {label}
                </p>

                {tooltip && (
                    <div style={{ position: 'relative' }}>
                        <Info
                            size={18} // იყო 14, გავხადეთ 18 (უფრო შესამჩნევია)
                            style={{
                                color: '#D4AF37', // გახდა ოქროსფერი
                                cursor: 'help',
                                opacity: 0.6, // ოდნავ დავაკლეთ სიკაშკაშე, რომ არ "ყვიროდეს"
                                transition: '0.2s'
                            }}
                            onMouseEnter={(e) => {
                                setShowTooltip(true);
                                e.currentTarget.style.opacity = '1'; // მაუსის მიტანისას ნათდება
                            }}
                            onMouseLeave={(e) => {
                                setShowTooltip(false);
                                e.currentTarget.style.opacity = '0.6';
                            }}
                        />

                        {showTooltip && (
                            <div style={{
                                position: 'absolute',
                                bottom: '125%', // ოდნავ მაღლა ავწიეთ
                                right: '0',
                                backgroundColor: '#1a1a1a',
                                color: '#D4AF37', // ტექსტიც ოქროსფერი (ან #ddd თუ ძალიან ბევრი ოქროსფერი არ გინდა)
                                padding: '16px', // გავზარდეთ შიდა დაშორება
                                borderRadius: '15px',
                                width: '260px', // გავზარდეთ სიგანე (იყო 200), რომ ტექსტი ჩაეტიოს
                                fontSize: '12px', // ოდნავ გავზარდეთ ფონტი
                                border: '1px solid #D4AF37',
                                zIndex: 9999,
                                boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
                                lineHeight: '1.5',
                                textAlign: 'left', // მარცხნიდან დაწყება უფრო პროფესიონალურია გრძელი ტექსტისთვის,
                                pointerEvents: 'none'
                            }}>
                                {tooltip}
                                {/* პატარა ისარი ქვემოთ */}
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '10px',
                                    borderWidth: '6px',
                                    borderStyle: 'solid',
                                    borderColor: '#D4AF37 transparent transparent transparent',
                                    pointerEvents: 'none'
                                }}></div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h3 style={{
                color: value < 0 ? '#ff4d4d' : color, // თუ მინუსია, ავტომატურად წითლდება
                fontSize: '32px',
                fontWeight: '900',
                marginTop: '0',
                marginBottom: 0,
                letterSpacing: '-1px'
            }}>
                {value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`}
            </h3>
        </div>
    );
};

export default ResultCard;