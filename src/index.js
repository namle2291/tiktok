import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyle';
import AuthProvider from './contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <GlobalStyle>
            <ToastContainer position="bottom-right" />
            <App />
        </GlobalStyle>
    </AuthProvider>,
);

reportWebVitals();
