import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import InputCard from './InputCard';

const ExpenseModule = ({ totalTax, setTotalTax, lang = 'en' }) => {
    const [mgmt, setMgmt] = useState(5);
    const [maint, setMaint] = useState(2);
    const [ins, setIns] = useState(1);
    const [vac, setVac] = useState(5);

    const currentLang = lang.toUpperCase();

    const localT = {
        KA: {
            title: "საოპერაციო ხარჯები (NOI)",
            mgmt: "ქონების მართვა",
            maint: "ტექ. მომსახურება",
            ins: "დაზღვევა",
            vac: "გაქირავების წყვეტა",
            ttMgmt: "მმართველი კომპანიის ან სააგენტოს მომსახურება (როგორც წესი, ქირის 10%)",
            ttMaint: "ყოველთვიური რეზერვი მიმდინარე რემონტისა და ავეჯის განახლებისთვის",
            ttIns: "უძრავი ქონებისა და მესამე პირის წინაშე პასუხისმგებლობის დაზღვევა",
            ttVac: "პერიოდი დამქირავებლების ცვლილებას შორის, როდესაც ბინა ცარიელია და შემოსავალი არ გენერირდება"
        },
        EN: {
            title: "Operating Expenses (NOI)",
            mgmt: "Property Management",
            maint: "Maintenance",
            ins: "Insurance",
            vac: "Rental Vacancy",
            ttMgmt: "Professional property management or agency fees (typically 10% of rent)",
            ttMaint: "Monthly reserve for ongoing repairs and furniture updates",
            ttIns: "Property and third-party liability insurance",
            ttVac: "Period between tenants when the property is empty and generates no income"
        },
        RU: {
            title: "Расходы (NOI)",
            mgmt: "Управление",
            maint: "Обслуживание",
            ins: "Страховка",
            vac: "Простой объекта",
            ttMgmt: "Услуги управляющей компании или агента (обычно 10% от аренды)",
            ttMaint: "Ежемесячный резерв на текущий ремонт и обновление мебели",
            ttIns: "Страхование имущества и гражданской ответственности",
            ttVac: "Период между сменой арендаторов, когда объект пустует и не приносит доход"
        }
    };

    const currT = localT[currentLang] || localT.EN;

    useEffect(() => {
        const sum = (Number(mgmt) || 0) + (Number(maint) || 0) + (Number(ins) || 0) + (Number(vac) || 0);
        setTotalTax(parseFloat(sum.toFixed(1)));
    }, [mgmt, maint, ins, vac, setTotalTax]);

    return (
        <div style={{
            backgroundColor: 'rgba(212, 175, 55, 0.03)',
            borderRadius: '20px',
            padding: '12px 15px',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            marginBottom: '15px',
            width: '100%',
            maxWidth: '415px'
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.1)', paddingBottom: '6px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={14} color="#D4AF37" />
                    <span style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '12px' }}>
                        {currT.title}
                    </span>
                </div>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>{totalTax}%</span>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px' // ძალიან მცირე დაშორება ინპუტებს შორის
            }}>
                {/* აქ ვიყენებთ ოდნავ შემცირებულ მასშტაბს, რომ ბევრი ადგილი არ წაიღოს */}
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center', marginBottom: '-5px' }}>
                    <InputCard label={currT.mgmt} value={mgmt} setter={setMgmt} unit="%" min={0} max={25} step={0.5} tooltip={currT.ttMgmt} />
                </div>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center', marginBottom: '-5px' }}>
                    <InputCard label={currT.maint} value={maint} setter={setMaint} unit="%" min={0} max={15} step={0.5} tooltip={currT.ttMaint} />
                </div>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center', marginBottom: '-5px' }}>
                    <InputCard label={currT.ins} value={ins} setter={setIns} unit="%" min={0} max={5} step={0.1} tooltip={currT.ttIns} />
                </div>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}>
                    <InputCard label={currT.vac} value={vac} setter={setVac} unit="%" min={0} max={20} step={0.5} tooltip={currT.ttVac} />
                </div>
            </div>
        </div>
    );
};

export default ExpenseModule;