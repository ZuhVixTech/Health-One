import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalPrescriptions: 0,
        pendingPrescriptions: 0,
        completedToday: 0,
    });
    const [recentPatients, setRecentPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setRefreshing(true);
            // Fetch stats
            const patientsRes = await api.get('/patients');
            const prescriptionsRes = await api.get('/prescriptions');
            
            const patients = patientsRes.data?.patients || patientsRes.data || [];
            const prescriptions = prescriptionsRes.data?.prescriptions || prescriptionsRes.data || [];
            
            setStats({
                totalPatients: patients.length,
                totalPrescriptions: prescriptions.length,
                pendingPrescriptions: prescriptions.filter(p => p.status === 'pending').length,
                completedToday: prescriptions.filter(p => {
                    const date = new Date(p.createdAt);
                    const today = new Date();
                    return date.toDateString() === today.toDateString() && p.status === 'completed';
                }).length,
            });
            
            setRecentPatients(patients.slice(0, 5));
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        
        // Real-time refresh every 30 seconds
        const interval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const StatCard = ({ emoji, title, value, color, trend }) => (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s, boxShadow 0.3s', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ color: '#4b5563', fontSize: '14px', fontWeight: '600', margin: 0 }}>{title}</p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px', color: color }}>{value}</p>
                    {trend && <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{trend}</p>}
                </div>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', backgroundColor: color === '#2563eb' ? '#dbeafe' : color === '#16a34a' ? '#dcfce7' : color === '#eab308' ? '#fef3c7' : '#f3e8ff' }}>
                    {emoji}
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Welcome Section */}
            <div style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8, #1e40af)', color: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', backgroundColor: 'white', opacity: 0.05, borderRadius: '50%', marginRight: '-80px', marginTop: '-80px' }}></div>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome back, {user?.name}! 👋</h1>
                    <p style={{ color: '#bfdbfe', fontSize: '18px', marginBottom: '16px' }}>Here's what's happening in your healthcare system today.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dbeafe', fontSize: '14px' }}>
                        🔄 Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <StatCard 
                    emoji="👥"
                    title="Total Patients" 
                    value={stats.totalPatients} 
                    color="#2563eb"
                    trend="Active patients"
                />
                <StatCard 
                    emoji="📋"
                    title="Total Prescriptions" 
                    value={stats.totalPrescriptions} 
                    color="#16a34a"
                    trend="All records"
                />
                <StatCard 
                    emoji="⏳"
                    title="Pending" 
                    value={stats.pendingPrescriptions} 
                    color="#eab308"
                    trend="Need attention"
                />
                <StatCard 
                    emoji="✓"
                    title="Completed Today" 
                    value={stats.completedToday} 
                    color="#9333ea"
                    trend="Today's completions"
                />
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
                {/* Recent Patients */}
                <div style={{ gridColumn: '1 / 3', backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Recent Patients</h2>
                        <button 
                            onClick={fetchDashboardData}
                            disabled={refreshing}
                            style={{ padding: '8px', backgroundColor: refreshing ? '#e5e7eb' : 'transparent', border: 'none', borderRadius: '8px', cursor: refreshing ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: refreshing ? 0.5 : 1 }}
                        >
                            {refreshing ? '🔄 Updating...' : '🔄'}
                        </button>
                    </div>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
                            <div style={{ fontSize: '32px' }}>⏳</div>
                        </div>
                    ) : recentPatients.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                                <thead style={{ background: 'linear-gradient(to right, #f9fafb, #f3f4f6)', borderBottom: '2px solid #e5e7eb' }}>
                                    <tr>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Age</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                                    {recentPatients.map((patient) => (
                                        <tr key={patient._id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'backgroundColor 0.2s' }}>
                                            <td style={{ padding: '16px', fontWeight: '500', color: '#111827' }}>{patient.name}</td>
                                            <td style={{ padding: '16px', color: '#4b5563' }}>{patient.email}</td>
                                            <td style={{ padding: '16px', color: '#4b5563' }}>{patient.age || 'N/A'}</td>
                                            <td style={{ padding: '16px', textAlign: 'center' }}>
                                                <Link to={`/patients/${patient._id}`} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                            <p>No patients yet. Start by adding a new patient.</p>
                            <Link to="/patients/add" style={{ color: '#2563eb', textDecoration: 'none', marginTop: '8px', display: 'inline-block', fontWeight: '600' }}>
                                Add Patient
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', margin: '0 0 24px 0' }}>Quick Actions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Link to="/patients/add" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'backgroundColor 0.2s' }}>
                            👥 <span>Add Patient</span>
                        </Link>
                        <Link to="/prescriptions/create" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'backgroundColor 0.2s' }}>
                            📋 <span>Create Prescription</span>
                        </Link>
                        <Link to="/ai-processing" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'backgroundColor 0.2s' }}>
                            🤖 <span>AI Processing</span>
                        </Link>
                        <Link to="/patients" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'backgroundColor 0.2s' }}>
                            📊 <span>View All Patients</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
