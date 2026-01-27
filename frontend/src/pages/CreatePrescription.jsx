import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaPlus, FaTrash, FaFilePdf } from 'react-icons/fa';

const CreatePrescription = () => {
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    const patientIdParam = searchParams.get('patientId');
    const navigate = useNavigate();

    const [patientId, setPatientId] = useState(patientIdParam || '');
    const [patients, setPatients] = useState([]);

    // Form State
    const [vitals, setVitals] = useState({ bp: '', pulse: '', temperature: '', weight: '' });
    const [complaints, setComplaints] = useState([{ complaint: '', duration: '', severity: '' }]);
    const [medicines, setMedicines] = useState([{ name: '', strength: '', frequency: '', duration: '', route: '', instructions: '' }]);
    const [diagnosis, setDiagnosis] = useState('');
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await api.get('/patients');
            setPatients(data);
        };
        fetchPatients();

        if (state?.aiData) {
            // Auto-fill from AI
            const { aiData } = state;
            setVitals({
                bp: aiData.vitals.bp.value,
                pulse: aiData.vitals.pulse.value,
                temperature: aiData.vitals.temperature.value,
                weight: '70' // Mock default
            });
            setMedicines(aiData.medicines.map(m => ({
                name: m.name.value,
                strength: m.strength.value,
                frequency: m.frequency.value,
                duration: m.duration.value,
                route: 'Oral',
                instructions: 'After Food'
            })));
            setComplaints(aiData.complaints.map(c => ({
                complaint: c.value.split('-')[0].trim(),
                duration: c.value.split('-')[1]?.trim() || '',
                severity: 'Moderate'
            })));
        }
    }, [state]);

    const handleMedicineChange = (index, field, value) => {
        const list = [...medicines];
        list[index][field] = value;
        setMedicines(list);
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', strength: '', frequency: '', duration: '', route: '', instructions: '' }]);
    };

    const removeMedicine = (index) => {
        const list = [...medicines];
        list.splice(index, 1);
        setMedicines(list);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                patient: patientId,
                vitals,
                complaints,
                medicines,
                diagnosis,
                advice
            };
            const { data } = await api.post('/prescriptions', payload);
            alert('Prescription Created!');
            // Redirect to view or download? Just alert for now and maybe link to PDF
            if (data.pdfPath) {
                // In production serve via backend URL
                // Ideally open in new tab
                console.log('PDF Path:', data.pdfPath);
            }
            navigate('/patients');
        } catch (error) {
            console.error(error);
            alert('Failed to save prescription');
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">New Prescription</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Select Patient</label>
                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
                        required
                    >
                        <option value="">-- Select Patient --</option>
                        {patients.map(p => (
                            <option key={p._id} value={p._id}>{p.name} (ID: {p.medicalId})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded">
                    <h3 className="col-span-full font-semibold text-gray-700">Vitals</h3>
                    <input placeholder="BP (mmHg)" value={vitals.bp} onChange={e => setVitals({ ...vitals, bp: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Pulse (bpm)" value={vitals.pulse} onChange={e => setVitals({ ...vitals, pulse: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Temp (°F)" value={vitals.temperature} onChange={e => setVitals({ ...vitals, temperature: e.target.value })} className="border p-2 rounded" />
                    <input placeholder="Weight (kg)" value={vitals.weight} onChange={e => setVitals({ ...vitals, weight: e.target.value })} className="border p-2 rounded" />
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Medicines (Rx)</h3>
                    {medicines.map((med, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-2 items-center">
                            <input placeholder="Medicine Name" value={med.name} onChange={e => handleMedicineChange(index, 'name', e.target.value)} className="col-span-2 border p-2 rounded" required />
                            <input placeholder="Dose (500mg)" value={med.strength} onChange={e => handleMedicineChange(index, 'strength', e.target.value)} className="border p-2 rounded" />
                            <input placeholder="Freq (1-0-1)" value={med.frequency} onChange={e => handleMedicineChange(index, 'frequency', e.target.value)} className="border p-2 rounded" />
                            <input placeholder="Duration" value={med.duration} onChange={e => handleMedicineChange(index, 'duration', e.target.value)} className="border p-2 rounded" />
                            <input placeholder="Instruction" value={med.instructions} onChange={e => handleMedicineChange(index, 'instructions', e.target.value)} className="col-span-1 border p-2 rounded" />
                            <button type="button" onClick={() => removeMedicine(index)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={addMedicine} className="mt-2 text-primary flex items-center gap-2 hover:underline">
                        <FaPlus /> Add Medicine
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Advice / Notes</label>
                    <textarea
                        className="w-full border p-2 rounded h-24"
                        value={advice}
                        onChange={e => setAdvice(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg">
                    Save & Generate Prescription
                </button>
            </form>
        </div>
    );
};

export default CreatePrescription;
