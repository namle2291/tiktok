import React, { useEffect, useState } from 'react';

import * as authService from '~/services/authService';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useAuthContext } from '~/contexts/AuthProvider';
import { useRef } from 'react';
const cx = classNames.bind(styles);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef();
    const timer = useRef();

    const navigate = useNavigate();
    const { token, setToken, setAuth } = useAuthContext();

    const handleClose = () => {
        navigate('/');
    };

    const handleLogin = () => {
        if (validated()) {
            const fetchAPI = () => {
                toast.promise(authService.authLogin({ email, password }), {
                    pending: {
                        render() {
                            return 'Chờ xíu...';
                        },
                    },
                    success: {
                        render({ data }) {
                            timer.current = setTimeout(() => {
                                setAuth(data.data);
                                setToken(data.meta.token);
                                navigate('/');
                            }, 1000);
                            return 'Đăng nhập thành công!';
                        },
                    },
                    error: {
                        render({ data }) {
                            return data.response.data.message;
                        },
                        type: 'warning',
                    },
                });
            };
            fetchAPI();
        }
    };

    const validated = () => {
        if (email === '') {
            return false;
        } else if (password === '') {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        } else {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timer.current) {
                console.log(timer.current);
                clearTimeout(timer.current);
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <div className={cx('close-button')}>
                    <span onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
                <div className={cx('form')}>
                    <div className={cx('title')}>Đăng nhập vào TikTok</div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')}>Email</label>
                        <input
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={cx('form-control')}
                            type="email"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')}>Mật khẩu</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cx('form-control')}
                            type="password"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <button onClick={handleLogin} className={cx('login-button')}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <p className={cx('policy')}>
                        Bằng cách tiếp tục, bạn đồng ý với Điều khoản Sử dụng của TikTok và xác nhận rằng bạn đã đọc
                        hiểu Chính sách Quyền riêng tư của TikTok.
                    </p>
                    <div className={cx('action')}>
                        Bạn không có tài khoản? <a>Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
