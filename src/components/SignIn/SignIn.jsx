import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { useAuthContext } from '~/contexts/AuthProvider';

import * as authService from '~/services/authService';

import { useNavigate } from 'react-router-dom';

import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Modal/Modal';

const cx = classNames.bind(styles);

export default function SignIn() {
    const [action, setAction] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setToken, setUser } = useAuthContext();

    const emailRef = useRef();
    const timer = useRef();

    const handleLogin = () => {
        if (validated()) {
            const fetchAPI = () => {
                toast.promise(authService.authLogin({ email, password }, !action ? 'login' : 'register'), {
                    pending: {
                        render() {
                            return 'Chờ xíu...';
                        },
                    },
                    success: {
                        render({ data }) {
                            timer.current = setTimeout(() => {
                                setUser(data.data);
                                setToken(data.meta.token);
                                window.location.reload();
                            }, 2000);
                            return !action ? 'Đăng nhập thành công!' : 'Đăng ký thành công!';
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
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('title')}>{!action ? 'Đăng nhập vào' : 'Đăng ký'} TikTok</div>
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
                        {!action ? 'Đăng nhập' : 'Đăng ký'}
                    </button>
                </div>
            </div>
            <div className={cx('footer')}>
                <p className={cx('policy')}>
                    Bằng cách tiếp tục, bạn đồng ý với Điều khoản Sử dụng của TikTok và xác nhận rằng bạn đã đọc hiểu
                    Chính sách Quyền riêng tư của TikTok.
                </p>
                <div className={cx('action')}>
                    Bạn không có tài khoản?{' '}
                    <span onClick={() => setAction(!action)}>{action ? 'Đăng nhập' : 'Đăng ký'}</span>
                </div>
            </div>
        </div>
    );
}
