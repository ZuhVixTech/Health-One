import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import {
  Dashboard, Login, Register, PatientList, AddPatient, CreatePrescription, AIPrescription
} from './pages';
import LoginScreen from './pages/LoginScreen';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="patients/add" element={<AddPatient />} />
        <Route path="prescriptions/create" element={<CreatePrescription />} />
        <Route path="ai-processing" element={<AIPrescription />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
