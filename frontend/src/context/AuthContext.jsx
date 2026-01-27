import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Ideally, verify token with backend here or decode it
                // For now, let's assume if token exists, we populate user from localStorage if saved
                // Or fetch user profile. 
                // Let's rely on localStorage 'userInfo' for quick load, then verify?
                const userInfo = localStorage.getItem('userInfo');
                if (userInfo) {
                    setUser(JSON.parse(userInfo));
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/users/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const register = async (name, email, password, role) => {
        const { data } = await api.post('/users', { name, email, password, role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
