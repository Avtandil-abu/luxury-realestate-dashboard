import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// დავამატეთ currentLang props-ებში
const ExportModule = ({ projectName, currentLang }) => {
    const exportPDF = async () => {
        const element = document.getElementById('main-report');

        const canvas = await html2canvas(element, {
            backgroundColor: '#050505',
            scale: 2,
            useCORS: true,
            height: element.offsetHeight,
            windowWidth: 1250,
        });

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // ფაილის სახელიც რომ ინგლისურად იყოს default-ად
        const fileName = currentLang === 'en' ? 'report' : currentLang === 'ru' ? 'otchet' : 'report';

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${projectName || 'investorcore'}-${fileName}.pdf`);
    };

    // აქ ხდება მაგია - ტექსტი იცვლება ენის მიხედვით
    const buttonText = {
        en: 'PDF Report',
        ru: 'PDF Отчет',
        ka: 'PDF რეპორტი'
    };

    return (
        <button onClick={exportPDF} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'transparent', border: '1px solid #D4AF37',
            color: '#D4AF37', padding: '10px 20px', borderRadius: '12px',
            cursor: 'pointer', fontWeight: 'bold'
        }}>
            <Download size={18} /> {buttonText[currentLang] || buttonText.en}
        </button>
    );
};

export default ExportModule;