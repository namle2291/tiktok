import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '~/contexts/AuthProvider';

import * as authService from '~/services/authService';

export default function Logout() {
    const [loading, setLoading] = useState(false);

    const timer = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        timer.current = setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setLoading(false);
            navigate('/');
        }, 2000);

        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return <>{loading && <span>Loading...</span>}</>;
}
