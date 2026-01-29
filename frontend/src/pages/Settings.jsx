import { useState } from 'react';
import { FaCog, FaBell, FaLock, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        darkMode: false,
        autoSave: true,
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const SettingToggle = ({ label, description, value, onChange }) => (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
            <div>
                <p className="text-gray-800 font-semibold">{label}</p>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
            <button
                onClick={onChange}
                className={`text-3xl transition ${value ? 'text-green-600' : 'text-gray-400'}`}
            >
                {value ? <FaToggleOn /> : <FaToggleOff />}
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your preferences and account settings</p>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center space-x-3">
                    <FaBell className="text-2xl" />
                    <h2 className="text-2xl font-bold">Notification Preferences</h2>
                </div>
                <div className="p-6 space-y-2">
                    <SettingToggle
                        label="Email Notifications"
                        description="Receive updates and notifications via email"
                        value={settings.emailNotifications}
                        onChange={() => toggleSetting('emailNotifications')}
                    />
                    <SettingToggle
                        label="SMS Notifications"
                        description="Receive important alerts via SMS"
                        value={settings.smsNotifications}
                        onChange={() => toggleSetting('smsNotifications')}
                    />
                    <SettingToggle
                        label="Push Notifications"
                        description="Receive push notifications in your browser"
                        value={settings.pushNotifications}
                        onChange={() => toggleSetting('pushNotifications')}
                    />
                </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 flex items-center space-x-3">
                    <FaLock className="text-2xl" />
                    <h2 className="text-2xl font-bold">Privacy & Security</h2>
                </div>
                <div className="p-6 space-y-4">
                    <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
                        Change Password
                    </button>
                    <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
                        Two-Factor Authentication
                    </button>
                    <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
                        Manage Devices
                    </button>
                    <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
                        View Login History
                    </button>
                </div>
            </div>

            {/* Display Settings */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex items-center space-x-3">
                    <FaCog className="text-2xl" />
                    <h2 className="text-2xl font-bold">Display Settings</h2>
                </div>
                <div className="p-6 space-y-2">
                    <SettingToggle
                        label="Dark Mode"
                        description="Use dark theme throughout the application"
                        value={settings.darkMode}
                        onChange={() => toggleSetting('darkMode')}
                    />
                    <SettingToggle
                        label="Auto-Save"
                        description="Automatically save changes as you work"
                        value={settings.autoSave}
                        onChange={() => toggleSetting('autoSave')}
                    />
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4">Danger Zone</h2>
                <p className="text-red-700 mb-4">These actions cannot be undone. Please proceed with caution.</p>
                <button className="w-full text-left px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Settings;
