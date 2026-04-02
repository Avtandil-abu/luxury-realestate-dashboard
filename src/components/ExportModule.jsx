import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportModule = ({ projectName }) => {
    const exportPDF = async () => {
        const element = document.getElementById('main-report');

        // ვასკანირებთ ელემენტს
        const canvas = await html2canvas(element, {
            backgroundColor: '#050505',
            scale: 2, // ხარისხისთვის
            useCORS: true,
            height: element.offsetHeight, // ვიღებთ ზუსტ სიმაღლეს რაც ეკრანზეა
            windowWidth: 1250, // ფიქსირებული ვირტუალური ფანჯარა
        });

        const imgData = canvas.toDataURL('image/png');

        // ვქმნით PDF-ს
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${projectName}-report.pdf`);
    };

    return (
        <button onClick={exportPDF} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'transparent', border: '1px solid #D4AF37',
            color: '#D4AF37', padding: '10px 20px', borderRadius: '12px',
            cursor: 'pointer', fontWeight: 'bold'
        }}>
            <Download size={18} /> PDF რეპორტი
        </button>
    );
};

export default ExportModule;