import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-200 mt-16">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">H</span>
                            </div>
                            <span className="text-xl font-bold text-white">HealthOne</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Advanced digital prescription management system designed to streamline healthcare delivery.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-blue-400 transition">Features</a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-blue-400 transition">About Us</a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 hover:text-blue-400 transition">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition">Patient Management</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition">E-Prescriptions</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition">AI Processing</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition">Report Generation</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <FaPhone className="text-blue-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">support@healthone.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">123 Healthcare Ave, Medical City, MC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-400">
                            <p>&copy; {currentYear} HealthOne. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-6 md:justify-end text-gray-400">
                            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
                            <a href="#" className="hover:text-blue-400 transition">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
