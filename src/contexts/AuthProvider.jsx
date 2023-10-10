import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import * as authService from '~/services/authService';

const { createContext } = require('react');

const authContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('token'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            setAuth({});
        }
    };

    useEffect(() => {
        if (token) {
            const fetchAPI = async () => {
                const result = await authService.getAuth();
                setAuth(result);
            };
            fetchAPI();
        }
    }, []);

    return <authContext.Provider value={{ auth, token, setAuth, setToken }}>{children}</authContext.Provider>;
}

export const useAuthContext = () => useContext(authContext);
