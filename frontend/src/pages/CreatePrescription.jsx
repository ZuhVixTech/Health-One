import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaPlus, FaTrash, FaFilePdf, FaArrowLeft, FaHeartbeat, FaCapsules, FaClipboard, FaExclamationTriangle, FaSpinner, FaCheckCircle } from 'react-icons/fa';
// const FaSave = () => <div>Icon</div>;
// const FaPlus = () => <div>Icon</div>;
// const FaTrash2 = () => <div>Icon</div>;
// const FaFilePdf = () => <div>Icon</div>;
// const FaArrowLeft = () => <div>Icon</div>;
// const FaHeartbeat = () => <div>Icon</div>;
// const FaCapsules = () => <div>Icon</div>;
// const FaClipboard = () => <div>Icon</div>;
// const FaExclamationTriangle = () => <div>Icon</div>;
// const FaSpinner = () => <div>Icon</div>;
// const FaCheckCircle = () => <div>Icon</div>;

const CreatePrescription = () => {
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    const patientIdParam = searchParams.get('patientId');
    const navigate = useNavigate();
    const { user } = useAuth();

    const [patientId, setPatientId] = useState(patientIdParam || '');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Form State
    const [vitals, setVitals] = useState({ bp: '', pulse: '', temperature: '', weight: '', height: '' });
    const [complaints, setComplaints] = useState([{ complaint: '', duration: '', severity: 'Moderate' }]);
    const [medicines, setMedicines] = useState([{ name: '', strength: '', frequency: '', duration: '', route: 'Oral', instructions: 'After Food' }]);
    const [diagnosis, setDiagnosis] = useState('');
    const [advice, setAdvice] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await api.get('/patients');
                setPatients(data);
            } catch (err) {
                setError('Failed to load patients');
            }
        };
        fetchPatients();

        if (state?.aiData) {
            const { aiData } = state;
            setVitals({
                bp: aiData.vitals?.bp?.value || '',
                pulse: aiData.vitals?.pulse?.value || '',
                temperature: aiData.vitals?.temperature?.value || '',
                weight: '70',
                height: '170'
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

    const handleVitalChange = (e) => {
        const { name, value } = e.target;
        setVitals({ ...vitals, [name]: value });
    };

    const handleComplaintChange = (idx, field, value) => {
        const newComplaints = [...complaints];
        newComplaints[idx][field] = value;
        setComplaints(newComplaints);
    };

    const addComplaint = () => {
        setComplaints([...complaints, { complaint: '', duration: '', severity: 'Moderate' }]);
    };

    const removeComplaint = (idx) => {
        setComplaints(complaints.filter((_, i) => i !== idx));
    };

    const handleMedicineChange = (idx, field, value) => {
        const newMedicines = [...medicines];
        newMedicines[idx][field] = value;
        setMedicines(newMedicines);
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', strength: '', frequency: '', duration: '', route: 'Oral', instructions: 'After Food' }]);
    };

    const removeMedicine = (idx) => {
        setMedicines(medicines.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!patientId) {
            setError('Please select a patient');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const prescriptionData = {
                patientId,
                doctorId: user._id,
                vitals,
                complaints,
                medicines,
                diagnosis,
                advice,
                notes,
                createdAt: new Date()
            };

            const { data } = await api.post('/prescriptions', prescriptionData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create prescription');
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePDF = async () => {
        try {
            const { data } = await api.post('/prescriptions/pdf', {
                patientId,
                vitals,
                complaints,
                medicines,
                diagnosis,
                advice,
                notes
            }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `prescription-${new Date().getTime()}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            setError('Failed to generate PDF');
        }
    };

    return (
        <div className="space-y-6 animate-slideInUp">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaArrowLeft className="text-2xl text-gray-600" />
                </button>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Create Prescription</h1>
                    <p className="text-gray-500 mt-1">Add prescription details for patient</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 animate-slideInRight">
                    <FaExclamationTriangle className="text-red-600 text-xl mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 font-semibold">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3 animate-slideInRight">
                    <FaCheckCircle className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
                    <p className="text-green-700 font-semibold">Prescription created successfully! Redirecting...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Patient Selection */}
                <div className="card-base animate-fadeIn">
                    <h2 className="subsection-title flex items-center gap-2">
                        <FaClipboard className="text-blue-600" /> Patient Information
                    </h2>
                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="input-primary"
                        required
                    >
                        <option value="">Select Patient</option>
                        {patients.map(p => (
                            <option key={p._id} value={p._id}>{p.name} - {p.email}</option>
                        ))}
                    </select>
                </div>

                {/* Vital Signs Section */}
                <div className="card-base animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                    <h2 className="subsection-title flex items-center gap-2">
                        <FaHeartbeat className="text-red-600" /> Vital Signs
                    </h2>
                    <div className="form-row-3">
                        {['bp', 'pulse', 'temperature'].map(field => (
                            <div key={field} className="form-group">
                                <label className="input-label capitalize">{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={vitals[field]}
                                    onChange={handleVitalChange}
                                    placeholder={field === 'bp' ? '120/80' : field === 'pulse' ? '72 bpm' : '98.6°F'}
                                    className="input-primary"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="form-row">
                        {['weight', 'height'].map(field => (
                            <div key={field} className="form-group">
                                <label className="input-label capitalize">{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={vitals[field]}
                                    onChange={handleVitalChange}
                                    placeholder={field === 'weight' ? 'kg' : 'cm'}
                                    className="input-primary"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chief Complaints */}
                <div className="card-base animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-600">
                        <h2 className="subsection-title m-0 flex items-center gap-2">
                            <FaExclamationTriangle className="text-orange-600" /> Chief Complaints
                        </h2>
                        <button
                            type="button"
                            onClick={addComplaint}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
                        >
                            <FaPlus /> Add Complaint
                        </button>
                    </div>

                    <div className="space-y-4">
                        {complaints.map((complaint, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors space-y-3">
                                <div className="form-row">
                                    <div>
                                        <label className="input-label">Complaint</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Headache, Fever"
                                            value={complaint.complaint}
                                            onChange={(e) => handleComplaintChange(idx, 'complaint', e.target.value)}
                                            className="input-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="input-label">Duration</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 2 days, 1 week"
                                            value={complaint.duration}
                                            onChange={(e) => handleComplaintChange(idx, 'duration', e.target.value)}
                                            className="input-primary"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-end gap-4">
                                    <div className="flex-1">
                                        <label className="input-label">Severity</label>
                                        <select
                                            value={complaint.severity}
                                            onChange={(e) => handleComplaintChange(idx, 'severity', e.target.value)}
                                            className="input-primary"
                                        >
                                            <option>Mild</option>
                                            <option>Moderate</option>
                                            <option>Severe</option>
                                        </select>
                                    </div>
                                    {complaints.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeComplaint(idx)}
                                            className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            <FaTrash2 />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Medicines Section */}
                <div className="card-base animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-600">
                        <h2 className="subsection-title m-0 flex items-center gap-2">
                            <FaCapsules className="text-blue-600" /> Medicines
                        </h2>
                        <button
                            type="button"
                            onClick={addMedicine}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
                        >
                            <FaPlus /> Add Medicine
                        </button>
                    </div>

                    <div className="space-y-4">
                        {medicines.map((medicine, idx) => (
                            <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors space-y-3">
                                <div className="form-row">
                                    <div>
                                        <label className="input-label">Medicine Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Paracetamol"
                                            value={medicine.name}
                                            onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                                            className="input-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="input-label">Strength</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 500mg"
                                            value={medicine.strength}
                                            onChange={(e) => handleMedicineChange(idx, 'strength', e.target.value)}
                                            className="input-primary"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div>
                                        <label className="input-label">Frequency</label>
                                        <select
                                            value={medicine.frequency}
                                            onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                                            className="input-primary"
                                        >
                                            <option>Once Daily</option>
                                            <option>Twice Daily</option>
                                            <option>Thrice Daily</option>
                                            <option>Four Times Daily</option>
                                            <option>As Needed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="input-label">Duration</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 5 days, 1 week"
                                            value={medicine.duration}
                                            onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                                            className="input-primary"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div>
                                        <label className="input-label">Route</label>
                                        <select
                                            value={medicine.route}
                                            onChange={(e) => handleMedicineChange(idx, 'route', e.target.value)}
                                            className="input-primary"
                                        >
                                            <option>Oral</option>
                                            <option>Topical</option>
                                            <option>Injection</option>
                                            <option>Inhalation</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="input-label">Instructions</label>
                                        <select
                                            value={medicine.instructions}
                                            onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                                            className="input-primary"
                                        >
                                            <option>After Food</option>
                                            <option>Before Food</option>
                                            <option>With Water</option>
                                            <option>With Milk</option>
                                        </select>
                                    </div>
                                </div>

                                {medicines.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMedicine(idx)}
                                        className="w-full p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <FaTrash2 /> Remove Medicine
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diagnosis & Advice */}
                <div className="card-base animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                    <h2 className="subsection-title">Diagnosis & Advice</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="input-label">Diagnosis</label>
                            <textarea
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                placeholder="Enter patient diagnosis..."
                                rows="3"
                                className="input-primary resize-none"
                            />
                        </div>
                        <div>
                            <label className="input-label">Advice & Recommendations</label>
                            <textarea
                                value={advice}
                                onChange={(e) => setAdvice(e.target.value)}
                                placeholder="Enter medical advice..."
                                rows="3"
                                className="input-primary resize-none"
                            />
                        </div>
                        <div>
                            <label className="input-label">Additional Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter any additional notes..."
                                rows="2"
                                className="input-primary resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                        <FaArrowLeft /> Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleGeneratePDF}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
                    >
                        <FaFilePdf /> Generate PDF
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                        {loading ? <><FaSpinner className="animate-spin" /> Saving...</> : <><FaSave /> Save Prescription</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePrescription;
