import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import * as authService from '~/services/authService';

const { createContext } = require('react');

const authContext = createContext();

export default function AuthProvider({ children }) {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            localStorage.removeItem('token');
        }
    };

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const fetchAPI = async () => {
                const result = await authService.getAuth();
                localStorage.setItem('user', JSON.stringify(result));
            };
            fetchAPI();
        }
    }, []);

    return <authContext.Provider value={{ user, setUser, setToken }}>{children}</authContext.Provider>;
}

export const useAuthContext = () => useContext(authContext);
