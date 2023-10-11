import React, { createRef, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '~/components/Button/Button';
import { HomeIcon, UsersIcon, CompassIcon, CameraIcon } from '~/components/Icons/Icons';

import * as userService from '~/services/userService';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Account from '~/components/AccountItem/Account';
import { useAuthContext } from '~/contexts/AuthProvider';
import { memo } from 'react';
const cx = classNames.bind(styles);

const menus = [
    {
        to: '/',
        title: 'Dành cho bạn',
        icon: HomeIcon,
    },
    {
        to: '/following',
        title: 'Đang Follow',
        icon: UsersIcon,
    },
    {
        to: '/explore',
        title: 'Khám phá',
        icon: CompassIcon,
    },
    {
        to: '/live',
        title: 'LIVE',
        icon: CameraIcon,
    },
];

function Sidebar() {
    const location = useLocation();
    const myRefs = useRef([]);

    const [userFollowing, setUserFollowing] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const fetchAPI = async () => {
                const result = await userService.getUserFollowing(1);
                setUserFollowing(result);
            };
            fetchAPI();
        }
    }, []);

    myRefs.current = menus.map((_, i) => myRefs.current[i] ?? createRef());

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                {menus.map((m, index) => {
                    let Icon = m.icon;
                    return (
                        <Link key={index} to={m.to}>
                            <Button
                                className={cx(location.pathname === m.to ? 'active' : '')}
                                normal
                                leftIcon={
                                    <Icon
                                        active={location.pathname === m.to ? true : false}
                                        ref={myRefs.current[index]}
                                    />
                                }
                            >
                                {m.title}
                            </Button>
                        </Link>
                    );
                })}
            </div>
            <div className={cx('user-following')}>
                {localStorage.getItem('user') ? (
                    <>
                        <h2>Các tài khoản đang follow</h2>
                        {userFollowing.map((user) => (
                            <div key={user.id} className={cx('user')}>
                                <Account data={user} />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <p className={cx('login-tip')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <span className={cx('login-button')}>
                            <Button to="/login" className={cx('link')} large>
                                Đăng nhập
                            </Button>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(Sidebar);
