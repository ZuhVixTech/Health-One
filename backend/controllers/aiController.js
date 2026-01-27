const path = require('path');

// @desc    Simulate AI Prescription Processing
// @route   POST /api/ai/process
// @access  Private
const processPrescription = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Extracted Data
        const extractedData = {
            patient: {
                name: { value: "John Doe", confidence: 0.95 },
                age: { value: 45, confidence: 0.88 },
                gender: { value: "Male", confidence: 0.92 }
            },
            complaints: [
                { value: "Fever - 3 days", confidence: 0.85 },
                { value: "Cough - Mild", confidence: 0.90 }
            ],
            vitals: {
                bp: { value: "120/80", confidence: 0.50 }, // Low confidence example
                pulse: { value: "72", confidence: 0.95 },
                temperature: { value: "98.6", confidence: 0.99 }
            },
            medicines: [
                {
                    name: { value: "Paracetamol", confidence: 0.98 },
                    strength: { value: "500mg", confidence: 0.95 },
                    frequency: { value: "1-0-1", confidence: 0.90 },
                    duration: { value: "5 days", confidence: 0.80 }
                },
                {
                    name: { value: "Amoxicillin", confidence: 0.95 },
                    strength: { value: "250mg", confidence: 0.92 },
                    frequency: { value: "1-1-1", confidence: 0.91 },
                    duration: { value: "3 days", confidence: 0.85 }
                }
            ],
            confidenceScore: 0.89
        };

        res.json({
            message: 'AI Processing Complete',
            filePath: req.file.path,
            data: extractedData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI Processing Failed' });
    }
};

module.exports = { processPrescription };
