import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const MarketBenchmark = ({ userGrowth, lang = 'KA' }) => {
    const GEORGIAN_AVG = 11.0;
    const diff = userGrowth - GEORGIAN_AVG;

    const content = {
        KA: {
            title: "ბაზრის ბენჩმარკი (RPPI)",
            avgLabel: "საქსტატის საშუალო:",
            statusHigh: "ოპტიმისტური მოლოდინი",
            statusLow: "კონსერვატიული მოლოდინი",
            statusMatch: "ბაზრის შესაბამისი",
            insightHigh: "შენი მოლოდინი აღემატება ბაზრის ისტორიულ ზრდას.",
            insightLow: "შენი პროგნოზი ბაზრის საშუალოზე დაბალია.",
            insightMatch: "შენი ციფრები ემთხვევა ბაზრის ტენდენციას."
        },
        EN: {
            title: "Market Benchmark (RPPI)",
            avgLabel: "Geostat Average:",
            statusHigh: "Optimistic Forecast",
            statusLow: "Conservative Forecast",
            statusMatch: "Market Match",
            insightHigh: "Your growth rate is above historical market average.",
            insightLow: "Your forecast is below the market average.",
            insightMatch: "Your numbers align with market trends."
        },
        RU: {
            title: "Рыночный бенчмарк (RPPI)",
            avgLabel: "Среднее по Сакстату:",
            statusHigh: "Оптимистичный прогноз",
            statusLow: "Консервативный прогноз",
            statusMatch: "Соответствует рынку",
            insightHigh: "Ваши ожидания выше исторического роста рынка.",
            insightLow: "Ваш прогноз ниже среднего рыночного показателя.",
            insightMatch: "Ваши цифры совпадают с рыночным трендом."
        }
    };

    const t = content[lang.toUpperCase()] || content.EN;

    const getStatus = () => {
        if (diff > 2) return { color: '#fbbf24', icon: <AlertCircle size={16} />, text: t.statusHigh };
        if (diff < -2) return { color: '#60a5fa', icon: <TrendingUp size={16} />, text: t.statusLow };
        return { color: '#34d399', icon: <CheckCircle size={16} />, text: t.statusMatch };
    };

    const status = getStatus();

    return (
        <div style={{
            backgroundColor: 'rgba(212, 175, 55, 0.08)', // ოდნავ უფრო გამოვკვეთოთ ფონი
            borderRadius: '20px',
            padding: '16px', // მეტი სივრცე შიგნით
            border: '1px solid rgba(212, 175, 55, 0.2)',
            marginTop: '10px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    {t.title}
                </span>
                <span style={{ color: '#fff', opacity: 0.6, fontSize: '12px' }}>
                    {t.avgLabel} {GEORGIAN_AVG}%
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: status.color }}>
                    {/* აიქონი ოდნავ გავზარდოთ */}
                    {React.cloneElement(status.icon, { size: 20 })}
                </div>
                <div>
                    <div style={{ color: status.color, fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {status.text}
                    </div>
                    <p style={{
                        color: '#fff',
                        opacity: 0.8,
                        fontSize: '12.5px', // აი აქ იყო ძალიან პატარა, გავზარდეთ
                        margin: 0,
                        lineHeight: '1.5'
                    }}>
                        {diff > 2 ? t.insightHigh : diff < -2 ? t.insightLow : t.insightMatch}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MarketBenchmark;