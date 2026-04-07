import React from 'react';

const InteractiveBackground = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundColor: '#050505',
                // ყველა ნათება ერთად, უფრო მკვეთრი პროცენტებით
                background: `
                    radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.18) 0%, transparent 50%),
                    radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)
                `,
                pointerEvents: 'none'
            }}
        />
    );
};

export default InteractiveBackground;