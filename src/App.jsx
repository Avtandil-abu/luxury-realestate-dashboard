import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Wallet, DollarSign, Calendar, ShieldCheck,
  AlertTriangle, Zap, Home, Gavel, Percent, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

// კომპონენტების იმპორტი
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import ChatButton from './components/ChatButton';
import ExportModule from './components/ExportModule';
import FinancialSummary from './components/FinancialSummary';
import HeaderControls from './components/HeaderControls';
import SmartInsights from './components/SmartInsights';

// კონტექსტი და დამხმარე ფაილები
import { useApp } from './context/AppContext';
import { calculateInvestment } from './utils/LogicEngine';
import { translations } from './constants/Translations';

const App = () => {
  // 1. კონტექსტიდან ვიღებთ ენას და ვალუტას
  const { lang, currency, rate } = useApp();
  const t = translations[lang];

  // 2. სტეიტები (მონაცემები)
  const [price, setPrice] = useState(() => Number(localStorage.getItem('invest_price')) || 100000);
  const [rent, setRent] = useState(() => Number(localStorage.getItem('invest_rent')) || 400);
  const [downPayment, setDownPayment] = useState(() => Number(localStorage.getItem('invest_down')) || 30);
  const [years, setYears] = useState(() => Number(localStorage.getItem('invest_years')) || 10);
  const [growth, setGrowth] = useState(() => Number(localStorage.getItem('invest_growth')) || 5);
  const [tax, setTax] = useState(() => Number(localStorage.getItem('invest_tax')) || 10);
  const [mortgageRate, setMortgageRate] = useState(() => Number(localStorage.getItem('invest_mortgage_rate')) || 12);
  const [activeScenario, setActiveScenario] = useState('moderate');

  // 3. ლოკალურ მეხსიერებაში შენახვა
  useEffect(() => {
    localStorage.setItem('invest_price', price);
    localStorage.setItem('invest_rent', rent);
    localStorage.setItem('invest_down', downPayment);
    localStorage.setItem('invest_years', years);
    localStorage.setItem('invest_growth', growth);
    localStorage.setItem('invest_tax', tax);
    localStorage.setItem('invest_mortgage_rate', mortgageRate);
  }, [price, rent, downPayment, years, growth, tax, mortgageRate]);

  // 4. გამოთვლები ახალი ლოგიკის ძრავით (LogicEngine)
  const stats = calculateInvestment({
    price, rent, downPayment, years, growth, tax, mortgageRate
  }, currency, rate);

  const currSym = currency === 'GEL' ? '₾' : '$';

  // გრაფიკის მონაცემები
  const chartData = Array.from({ length: Number(years) + 1 }, (_, i) => ({
    name: `${i} ${t.years}`,
    ფასი: Math.round(stats.price * Math.pow(1 + Number(growth) / 100, i)),
    ვალი: Math.round(Math.max(0, (stats.price * 0.7) * (1 - i / Number(years)))),
  }));

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ნავიგაცია */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', borderBottom: '1px solid #111', backgroundColor: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000
      }}>
        <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px', color: '#D4AF37' }}>
          AVTANDIL ABU44
        </div>

        <HeaderControls />

        <div style={{ display: 'flex', gap: '30px', fontSize: '13px', fontWeight: '600', color: '#888' }}>
          <span className="interactive-link" style={{ color: '#fff' }}>{t.title}</span>
          <a href="https://www.geostat.ge" target="_blank" rel="noreferrer" className="interactive-link" style={{ color: '#888', textDecoration: 'none' }}>
            {t.monitor || "ბაზარი"}
          </a>
        </div>
        <button style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>
          {t.consult}
        </button>
      </nav>

      <div id="main-report" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>

        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px' }}>INVESTOR<span style={{ color: '#2563eb' }}>CORE</span></h1>
          <p style={{ color: '#D4AF37', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '6px', fontWeight: '900' }}>Avtandil's Pro Edition</p>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => { setGrowth(2); setTax(15); setMortgageRate(14); setActiveScenario('conservative') }} style={btnStyle(activeScenario === 'conservative', '#666')}><ShieldCheck size={16} /> Safe</button>
            <button onClick={() => { setGrowth(5); setTax(10); setMortgageRate(12); setActiveScenario('moderate') }} style={btnStyle(activeScenario === 'moderate', '#D4AF37')}><AlertTriangle size={16} /> Mid</button>
            <button onClick={() => { setGrowth(8); setTax(5); setMortgageRate(10); setActiveScenario('aggressive') }} style={btnStyle(activeScenario === 'aggressive', '#2563eb')}><Zap size={16} /> Pro</button>
          </div>
          <ExportModule projectName="avtandil-pro-analytics" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
          {/* მარცხენა სვეტი - ინპუტები */}
          <div>
            <InputCard label={t.price} icon={<DollarSign size={22} />} value={currency === 'GEL' ? price * 2.7 : price} setter={setPrice} unit={currSym} min={1000} max={2000000} step={1000} tooltip={t.ttPrice} />
            <InputCard label={t.rent} icon={<Wallet size={22} />} value={rent} setter={setRent} unit={currSym} min={0} max={20000} step={50} tooltip={t.ttRent} />
            <InputCard label={t.growth} icon={<Home size={22} />} value={growth} setter={setGrowth} unit="%" min={0} max={30} step={1} tooltip={t.ttGrowth} />
            <InputCard label={t.tax} icon={<Gavel size={22} />} value={tax} setter={setTax} unit="%" min={0} max={50} step={1} tooltip={t.ttTax} />
            <InputCard label={t.mortgage} icon={<Percent size={22} />} value={mortgageRate} setter={setMortgageRate} unit="%" min={1} max={25} step={0.1} tooltip={t.ttMortgage} />
            <InputCard label={t.downPayment} icon={<Percent size={22} />} value={downPayment} setter={setDownPayment} unit="%" min={0} max={100} step={5} tooltip={t.ttDown} />
            <InputCard label={t.period} icon={<Calendar size={22} />} value={years} setter={setYears} unit={` ${t.years}`} min={1} max={40} step={1} tooltip={t.ttPeriod} />
          </div>

          {/* მარჯვენა სვეტი - შედეგები */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ backgroundColor: '#2563eb', padding: '50px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}>
              <p style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', fontWeight: '900' }}>{t.profit}</p>
              <h2 style={{ fontSize: '72px', fontWeight: '900', margin: '20px 0' }}>{currSym}{Math.round(stats.totalProfit).toLocaleString()}</h2>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ color: '#4ade80', fontWeight: '900' }}>{t.roi}: {stats.roi}%</span>
                <span style={{ fontSize: '14px', opacity: 0.9 }}>{t.breakeven}: {stats.breakeven} {t.years}</span>
              </div>
            </div>

            <SmartInsights roi={stats.roi} cashflow={stats.monthlyCashflow} growth={growth} />

            <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '40px', border: '1px solid #222', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', border: '1px solid #D4AF37', borderRadius: '15px' }}
                    formatter={(value) => [`${currSym}${value.toLocaleString()}`, ""]}
                  />
                  <Area type="monotone" dataKey="ფასი" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={3} />
                  <Area type="monotone" dataKey="ვალი" stroke="#f87171" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <ResultCard label="Final Value" value={Math.round(stats.finalPrice)} color="#4ade80" />
              <ResultCard label="Monthly Net" value={Math.round(stats.monthlyCashflow)} color="#fff" />
              <ResultCard label="Mortgage Pay" value={Math.round(stats.monthlyMortgage)} color="#f87171" />
              <ResultCard label="Equity" value={Math.round(stats.investedCapital)} color="#60a5fa" />
            </div>

            <FinancialSummary
              netRent={stats.rent * (1 - tax / 100)}
              safeYears={years}
              appreciation={stats.appreciation}
              monthlyMortgage={stats.monthlyMortgage}
              loan={stats.price - stats.investedCapital}
              totalProfit={stats.totalProfit}
            />
          </div>
        </div>

        <footer style={{ borderTop: '1px solid #111', padding: '60px 0', marginTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '80px' }}>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '900' }}>INVESTORCORE</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{t.footerText}</p>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.sources}</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.5' }}>
                <li><a href="https://www.nbg.gov.ge" target="_blank" rel="noreferrer" className="interactive-link" style={{ color: '#666', textDecoration: 'none' }}>NBG.GE</a></li>
                <li><a href="https://www.geostat.ge" target="_blank" rel="noreferrer" className="interactive-link" style={{ color: '#666', textDecoration: 'none' }}>GEOSTAT</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.contact}</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.5' }}>
                <li><a href="tel:+9955XXXXXXXX" className="interactive-link" style={{ color: '#666', textDecoration: 'none' }}>+995 5XX XX XX XX</a></li>
                <li><a href="mailto:info@investorcore.ge" className="interactive-link" style={{ color: '#666', textDecoration: 'none' }}>Email Us</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      <ChatButton />
    </div>
  );
};

const btnStyle = (active, color) => ({
  backgroundColor: active ? color : '#111',
  border: `1px solid ${active ? color : '#222'}`,
  color: active ? '#fff' : '#666',
  padding: '12px 24px',
  borderRadius: '16px',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '10px',
  fontSize: '12px', fontWeight: 'bold', transition: '0.3s'
});

export default App;