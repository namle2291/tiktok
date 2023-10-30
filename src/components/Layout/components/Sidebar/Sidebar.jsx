import React, { createRef, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '~/components/Button/Button';
import { HomeIcon, UsersIcon, CompassIcon, CameraIcon } from '~/components/Icons/Icons';

import * as userService from '~/services/userService';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Account from '~/components/AccountItem/Account';
import { memo } from 'react';
import { useCallback } from 'react';
import SignIn from '~/components/SignIn/SignIn';
import Modal from '~/components/Modal/Modal';
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
    const [userFollowing, setUserFollowing] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [seeMore, setSeeMore] = useState(false);
    const [seeLess, setSeeLess] = useState(false);

    const location = useLocation();
    const myRefs = useRef([]);

    myRefs.current = menus.map((_, i) => myRefs.current[i] ?? createRef());

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const fetchAPI = async () => {
                const response = await userService.getUserFollowing(page);
                const { pagination } = response.meta;
                const { data } = response;
                if (data.length > 0) {
                    if (!seeLess) {
                        setUserFollowing((prevUser) => [...prevUser, ...data]);
                        setSeeMore(page < pagination.total_pages ? true : false);
                        setSeeLess(pagination.current_page === pagination.total_pages ? true : false);
                    } else {
                        setUserFollowing(data);
                        setSeeLess(false);
                        setSeeMore(true);
                    }
                }
            };
            fetchAPI();
        }
    }, [page]);

    const handleToggleModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    return (
        <>
            {showModal && <Modal onShow={handleToggleModal} children={<SignIn />} />}
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
                            {seeMore && (
                                <span onClick={() => setPage((prev) => prev + 1)} className={cx('see-more')}>
                                    Xem thêm
                                </span>
                            )}
                            {seeLess && (
                                <span onClick={() => setPage((prev) => prev - 1)} className={cx('see-more')}>
                                    Ẩn bớt
                                </span>
                            )}
                        </>
                    ) : (
                        <>
                            <p className={cx('login-tip')}>
                                Đăng nhập để follow các tác giả, thích video và xem bình luận.
                            </p>
                            <span className={cx('login-button')}>
                                <Button onClick={handleToggleModal} className={cx('link')} large>
                                    Đăng nhập
                                </Button>
                            </span>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default memo(Sidebar);
