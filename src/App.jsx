import React, { useState, useEffect } from 'react';
import InteractiveBackground from './InteractiveBackground';
import './App.css';
import {
  Wallet, DollarSign, Calendar, ShieldCheck,
  AlertTriangle, Zap, Home, Gavel, Percent, ExternalLink,
  Share2, Check, RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';
import ComparisonModule from './components/ComparisonModule';
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import ChatButton from './components/ChatButton';
import ExportModule from './components/ExportModule';
import FinancialSummary from './components/FinancialSummary';
import HeaderControls from './components/HeaderControls';
import SmartInsights from './components/SmartInsights';

import { useApp } from './context/AppContext';
import { calculateInvestment } from './utils/LogicEngine';
import { translations } from './constants/Translations';
import { generateShareLink, parseShareLink } from './utils/shareLink';
import { getLiveMarketRates } from './utils/marketData';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { lang, currency, rate } = useApp();
  const t = translations[lang];

  const [price, setPrice] = useState(() => Number(localStorage.getItem('invest_price')) || 100000);
  const [rent, setRent] = useState(() => Number(localStorage.getItem('invest_rent')) || 400);
  const [downPayment, setDownPayment] = useState(() => Number(localStorage.getItem('invest_down')) || 30);
  const [years, setYears] = useState(() => Number(localStorage.getItem('invest_years')) || 10);
  const [growth, setGrowth] = useState(() => Number(localStorage.getItem('invest_growth')) || 5);
  const [tax, setTax] = useState(() => Number(localStorage.getItem('invest_tax')) || 10);
  const [mortgageRate, setMortgageRate] = useState(() => Number(localStorage.getItem('invest_mortgage_rate')) || 12);
  const [activeScenario, setActiveScenario] = useState('moderate');

  const [rentGrowth, setRentGrowth] = useState(() => Number(localStorage.getItem('invest_rent_growth')) || 3);
  const [isLinked, setIsLinked] = useState(() => localStorage.getItem('invest_is_linked') === 'true');

  useEffect(() => {
    const market = getLiveMarketRates();
    if (!localStorage.getItem('invest_price')) {
      setPrice(market.defaultPrice);
      setRent(market.defaultRent);
      setGrowth(market.marketGrowth);
      setRentGrowth(market.rentInflation);
      setMortgageRate(market.avgMortgageRate);
    }
  }, []);

  useEffect(() => {
    const sharedData = parseShareLink();
    if (sharedData) {
      if (sharedData.price) setPrice(sharedData.price);
      if (sharedData.rent) setRent(sharedData.rent);
      if (sharedData.downPayment) setDownPayment(sharedData.downPayment);
      if (sharedData.years) setYears(sharedData.years);
      if (sharedData.growth) setGrowth(sharedData.growth);
      if (sharedData.tax) setTax(sharedData.tax);
      if (sharedData.mortgageRate) setMortgageRate(sharedData.mortgageRate);
    }
  }, []);

  useEffect(() => {
    if (isLinked) {
      const syncedRentGrowth = Math.round((growth * 0.6) * 10) / 10;
      setRentGrowth(syncedRentGrowth);
    }
  }, [growth, isLinked]);

  useEffect(() => {
    localStorage.setItem('invest_price', price);
    localStorage.setItem('invest_rent', rent);
    localStorage.setItem('invest_down', downPayment);
    localStorage.setItem('invest_years', years);
    localStorage.setItem('invest_growth', growth);
    localStorage.setItem('invest_tax', tax);
    localStorage.setItem('invest_mortgage_rate', mortgageRate);
    localStorage.setItem('invest_rent_growth', rentGrowth);
    localStorage.setItem('invest_is_linked', isLinked);
  }, [price, rent, downPayment, years, growth, tax, mortgageRate, rentGrowth, isLinked]);

  const handleShare = () => {
    const link = generateShareLink({ price, rent, downPayment, years, growth, tax, mortgageRate });
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = calculateInvestment({
    price: Number(price),
    rent: Number(rent),
    downPayment: Number(downPayment),
    years: Number(years),
    growth: Number(growth),
    tax: Number(tax),
    mortgageRate: Number(mortgageRate),
    rentGrowth: Number(rentGrowth)
  }, currency, rate);

  const currSym = currency === 'GEL' ? '₾' : '$';

  const chartData = Array.from({ length: Number(years) + 1 }, (_, i) => ({
    name: `${i} ${t.years}`,
    value: Math.round(stats.price * Math.pow(1 + Number(growth) / 100, i)),
    debt: Math.round(Math.max(0, (stats.price * 0.7) * (1 - i / Number(years)))),
    equity: Math.round(Math.round(stats.price * Math.pow(1 + Number(growth) / 100, i)) - Math.round(Math.max(0, (stats.price * 0.7) * (1 - i / Number(years))))),
  }));

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <InteractiveBackground />
      {!isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.4
        }} />
      )}
      {!isMobile && (
        <>
          <div style={{
            position: 'fixed', top: '-10%', left: '-5%', width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none'
          }} />
          <div style={{
            position: 'fixed', bottom: '-10%', right: '-5%', width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none'
          }} />
        </>
      )}

      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '10px 20px' : '20px 40px', borderBottom: '1px solid #111', backgroundColor: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000,
        flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '15px' : '0'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px', color: '#D4AF37' }}>
          AVTANDIL ABU44
        </div>
        <HeaderControls />
        {!isMobile && (
          <div style={{ display: 'flex', gap: '30px', fontSize: '13px', fontWeight: '600' }}>
            <span style={{ color: '#fff' }}>{t.title}</span>
            <a href="https://www.geostat.ge" target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
              {t.monitor || "ბაზარი"}
            </a>
          </div>
        )}
        <button style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}>
          {t.consult}
        </button>
      </nav>

      <main id="main-report" style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '20px' : '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '900', letterSpacing: '-2px' }}>
            INVESTOR<span style={{ color: '#2563eb' }}>CORE</span>
          </h1>
          <p style={{ color: '#D4AF37', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '900' }}>
            Avtandil's Pro Edition
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => { setGrowth(2); setTax(15); setMortgageRate(14); setActiveScenario('conservative') }} style={btnStyle(activeScenario === 'conservative', '#666')}><ShieldCheck size={16} /> Safe</button>
            <button onClick={() => { setGrowth(5); setTax(10); setMortgageRate(12); setActiveScenario('moderate') }} style={btnStyle(activeScenario === 'moderate', '#D4AF37')}><AlertTriangle size={16} /> Mid</button>
            <button onClick={() => { setGrowth(8); setTax(5); setMortgageRate(10); setActiveScenario('aggressive') }} style={btnStyle(activeScenario === 'aggressive', '#2563eb')}><Zap size={16} /> Pro</button>
          </div>

          <div style={{ display: 'flex', gap: '12px', width: isMobile ? '100%' : 'auto' }}>
            <ExportModule projectName="avtandil-pro-analytics" currentLang={lang} />
            <button
              onClick={handleShare}
              style={{
                backgroundColor: '#111', color: copied ? '#4ade80' : '#D4AF37', border: '1px solid #222',
                padding: '12px 20px', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', transition: '0.3s',
                flex: isMobile ? 1 : 'none'
              }}
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? '20px' : '40px' }}>
          <section>
            <InputCard label={t.price} icon={<DollarSign size={22} />} value={currency === 'GEL' ? price * rate : price} setter={setPrice} unit={currSym} min={1000} max={2000000} step={1000} tooltip={t.ttPrice} />
            <InputCard label={t.rent} icon={<Wallet size={22} />} value={rent} setter={setRent} unit={currSym} min={0} max={20000} step={50} tooltip={t.ttRent} />

            <InputCard
              label={t.rentGrowthLabel}
              icon={<RefreshCw size={22} />}
              value={rentGrowth}
              setter={setRentGrowth}
              unit="%"
              min={0} max={25} step={1}
              tooltip="რამდენი პროცენტით მოიმატებს ქირა ყოველწლიურად"
            />
            <div style={{ fontSize: '11px', color: '#666', marginTop: '-12px', marginBottom: '15px', marginLeft: '15px', opacity: 0.8 }}>
              {t.rentSource}
            </div>

            <div style={{
              display: 'flex', flexDirection: 'column', gap: '4px',
              marginBottom: '16px', padding: '15px 24px',
              backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: '24px',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={isLinked}
                  onChange={(e) => setIsLinked(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#D4AF37', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#D4AF37', fontWeight: 'bold' }}>
                  {t.syncLabel}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#888', margin: '6px 0 0 30px', lineHeight: '1.4' }}>
                {t.syncDesc}
              </p>
            </div>

            <InputCard
              label={t.growth}
              icon={<Home size={22} />}
              value={growth}
              setter={setGrowth}
              unit="%" min={0} max={30} step={1} tooltip={t.ttGrowth}
            />
            <div style={{ fontSize: '11px', color: '#666', marginTop: '-12px', marginBottom: '15px', marginLeft: '15px', opacity: 0.8 }}>
              {t.growthSource}
            </div>

            <InputCard label={t.tax} icon={<Gavel size={22} />} value={tax} setter={setTax} unit="%" min={0} max={50} step={1} tooltip={t.ttTax} />
            <InputCard label={t.mortgage} icon={<Percent size={22} />} value={mortgageRate} setter={setMortgageRate} unit="%" min={1} max={25} step={1} tooltip={t.ttMortgage} />
            <InputCard label={t.downPayment} icon={<Percent size={22} />} value={downPayment} setter={setDownPayment} unit="%" min={0} max={100} step={5} tooltip={t.ttDown} />
            <InputCard label={t.period} icon={<Calendar size={22} />} value={years} setter={setYears} unit={` ${t.years}`} min={1} max={40} step={1} tooltip={t.ttPeriod} />
          </section>

          <section style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{
              backgroundColor: '#2563eb',
              padding: isMobile ? '30px' : '50px',
              borderRadius: '40px',
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
              minHeight: isMobile ? '280px' : '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <p style={{ fontSize: '12px', opacity: 0.9, textTransform: 'uppercase', fontWeight: '900' }}>{t.profit}</p>
              <h2 style={{
                fontSize: isMobile ? '32px' : '64px', fontWeight: '900', margin: '20px 0', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {currSym}{Math.round(stats.totalProfit).toLocaleString()}
              </h2>
              <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
                <span style={{ color: '#4ade80', fontWeight: '900' }}>{t.roi}: {stats.roi}%</span>
                <span style={{ fontSize: '14px', opacity: 1 }}>{t.breakeven}: {stats.breakeven} {t.years}</span>
              </div>
            </div>

            <div style={{ minHeight: '140px' }}>
              <SmartInsights roi={stats.roi} cashflow={stats.monthlyCashflow} growth={growth} />
            </div>

            <div style={{ backgroundColor: '#111', padding: isMobile ? '15px' : '30px', borderRadius: '40px', border: '1px solid #222', height: isMobile ? '280px' : '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{
                            backgroundColor: 'rgba(5, 5, 5, 0.95)',
                            backdropFilter: 'blur(15px)',
                            border: '1px solid #D4AF37',
                            borderRadius: '16px',
                            padding: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            minWidth: '200px'
                          }}>
                            <p style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '12px', marginBottom: '10px', borderBottom: '1px solid #222', paddingBottom: '6px' }}>{label}</p>
                            {payload.map((entry, index) => {
                              let displayName = entry.name;
                              if (entry.name === "value") displayName = t.price;
                              if (entry.name === "debt") displayName = lang === 'ka' ? 'დარჩენილი ვალი' : 'Remaining Debt';
                              if (entry.name === "equity") displayName = lang === 'ka' ? 'შენი წილი' : 'Your Equity';
                              return (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }} />
                                    <span style={{ color: '#999', fontSize: '11px' }}>{displayName}</span>
                                  </div>
                                  <span style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{currSym}{entry.value.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area name="value" type="monotone" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.05} strokeWidth={2} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Area name="debt" type="monotone" dataKey="debt" stroke="#f87171" fill="transparent" strokeWidth={2} strokeDasharray="5 5" activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Area name="equity" type="monotone" dataKey="equity" stroke="#D4AF37" fill="url(#goldGradient)" strokeWidth={4} activeDot={{ r: 8, strokeWidth: 0 }} />
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
              <ResultCard label={t.finalValue} value={Math.round(stats.finalPrice)} color="#4ade80" tooltip={t.ttFinalValue} />
              <ResultCard label={t.monthlyNet} value={Math.round(stats.monthlyCashflow)} color="#fff" tooltip={t.ttMonthlyNet} />
              <ResultCard label={t.mortgagePay} value={Math.round(stats.monthlyMortgage)} color="#f87171" tooltip={t.ttMortgagePay} />
              <ResultCard label={t.equity} value={Math.round(stats.investedCapital)} color="#60a5fa" tooltip={t.ttEquity} />
            </div>
          </section>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px',
          width: '100%',
          marginTop: '30px',
          alignItems: 'stretch'
        }}>
          <ComparisonModule price={price} rent={rent} growth={growth} years={years} downPayment={downPayment} stats={stats} t={t} currSym={currSym} lang={lang} />
          <FinancialSummary
            totalProfit={stats.totalProfit}
            appreciation={stats.appreciation}
            netRent={stats.rent * (1 - tax / 100)}
            loan={stats.price - stats.investedCapital}
            totalMortgage={stats.totalMortgage || (stats.appreciation + (stats.rent * 12 * years * (1 - tax / 100)) - stats.totalProfit)}
            years={years}
            lang={lang}
            currSym={currSym}
          />
        </div>

        <footer style={{ borderTop: '1px solid #111', padding: '60px 0', marginTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: isMobile ? '40px' : '80px', textAlign: isMobile ? 'center' : 'left' }}>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '900' }}>INVESTORCORE</h3>
              <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.6' }}>{t.footerText}</p>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.sources}</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.5' }}>
                <li><a href="https://www.nbg.gov.ge" target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>NBG.GE</a></li>
                <li><a href="https://www.geostat.ge" target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>GEOSTAT</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.contact}</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.5' }}>
                <li style={{ color: '#999' }}>+995 5XX XX XX XX</li>
                <li style={{ color: '#999' }}>Email Us</li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
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