const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (prescription, path) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(path);

        doc.pipe(stream);

        // Header
        doc.fontSize(20).text('CLINIC NAME', { align: 'center' });
        doc.fontSize(10).text('123 Health Street, Wellness City', { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, 100).lineTo(550, 100).stroke();

        // Doctor Info
        doc.fontSize(12).text(`Dr. ${prescription.doctor.user.name}`, 50, 120);
        doc.fontSize(10).text(prescription.doctor.qualification, 50, 135);
        doc.text(prescription.doctor.specialization, 50, 150);

        // Patient Info
        doc.fontSize(12).text(`Patient Name: ${prescription.patient.name}`, 300, 120);
        doc.fontSize(10).text(`Age/Sex: ${prescription.patient.age} / ${prescription.patient.gender}`, 300, 135);
        doc.text(`Date: ${new Date(prescription.date).toLocaleDateString()}`, 300, 150);

        doc.moveDown();
        doc.moveTo(50, 180).lineTo(550, 180).stroke();

        // Diagnosis & Vitals
        let y = 200;
        doc.fontSize(12).text('Vitals:', 50, y);
        doc.fontSize(10).text(`BP: ${prescription.vitals.bp}`, 50, y + 15);
        doc.text(`Pulse: ${prescription.vitals.pulse}`, 150, y + 15);
        doc.text(`Temp: ${prescription.vitals.temperature}`, 250, y + 15);
        doc.text(`Weight: ${prescription.vitals.weight}`, 350, y + 15);

        y += 40;
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 20;

        // Medicines
        doc.fontSize(14).text('Medicines (Rx)', 50, y);
        y += 20;

        prescription.medicines.forEach((med, index) => {
            doc.fontSize(12).text(`${index + 1}. ${med.name} (${med.strength})`, 50, y);
            doc.fontSize(10).text(`${med.frequency} | ${med.duration} | ${med.instructions}`, 50, y + 15);
            y += 35;
        });

        // Advice
        if (prescription.advice) {
            y += 20;
            doc.fontSize(12).text('Advice:', 50, y);
            doc.fontSize(10).text(prescription.advice, 50, y + 20);
        }

        doc.end();

        stream.on('finish', () => resolve(path));
        stream.on('error', (err) => reject(err));
    });
};

module.exports = generatePDF;
