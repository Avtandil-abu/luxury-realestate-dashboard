import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton = () => (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
        <button
            style={{
                backgroundColor: '#2563eb', color: 'white', width: '60px', height: '60px',
                borderRadius: '50%', border: 'none', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: '0.3s transform'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <MessageCircle size={30} />
        </button>
    </div>
);

export default ChatButton;