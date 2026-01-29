import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Try: doctor@health.com / 123456');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
                {/* Left Section - Branding */}
                <div className="hidden md:flex flex-col justify-center p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                            <span className="animate-pulse">❤️</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">HealthOne</h1>
                            <p className="text-blue-600 font-semibold text-lg">Digital Prescription Management</p>
                        </div>
                    </div>
                    <div className="space-y-6 text-gray-600 text-lg">
                        <p className="leading-relaxed">
                            Streamline your medical practice with our advanced digital prescription system.
                            Create, manage, and track patient prescriptions with AI-powered assistance.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                AI-Powered Analysis
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                Instant PDF Generation
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                                Secure Patient Records
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Section - Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex flex-col gap-1">
                            <p className="font-semibold">Login Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-600">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 font-bold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                        <p className="font-semibold mb-2">Demo Credentials:</p>
                        <div className="flex justify-between">
                            <span>Email:</span>
                            <span className="font-mono">doctor@health.com</span>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span>Password:</span>
                            <span className="font-mono">123456</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
