import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import 'tippy.js/dist/tippy.css';
import {
    faCog,
    faEllipsisV,
    faGlobeAmericas,
    faKeyboard,
    faQuestionCircle,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MailIcon, MessageIcon, PlusIcon, TiktokIcon } from '~/components/Icons/Icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import Button from '~/components/Button/Button';
import Menu from '~/components/Layout/Popper/Menu';
import Image from '~/components/Images';
import Search from '../Search/Search';
import Modal from '~/components/Modal/Modal';

import { DeviceIcon } from '~/components/Icons/Icons';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useAuthContext } from '~/contexts/AuthProvider';
import { memo } from 'react';
import { useCallback } from 'react';
import SignIn from '~/components/SignIn/SignIn';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGlobeAmericas} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    code: 'en',
                    title: 'English',
                    children: {
                        title: 'Ngôn ngữ',
                        data: [
                            {
                                code: 'en',
                                title: 'English 1',
                            },
                            {
                                code: 'vi',
                                title: 'Tiếng Việt 1',
                            },
                        ],
                    },
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt trên bàn phím',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/@lnam6507',
    },
    {
        icon: <FontAwesomeIcon icon={faTiktok} />,
        title: 'Nhận xu',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faCog} />,
        title: 'Cài đặt',
        to: '/setting',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất   ',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const [showModal, setShowModal] = useState(false);

    const { user } = useAuthContext();

    const handleToggleModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    return (
        <>
            {showModal && <Modal onShow={handleToggleModal} children={<SignIn />} />}
            <header className={cx('wrapper')}>
                <div className={cx('content')}>
                    <Link to="/" className={cx('logo')}>
                        <TiktokIcon />
                    </Link>
                    {/* Search */}
                    <div className={cx('search')}>
                        <Search />
                    </div>
                    <div className={cx('actions')}>
                        {localStorage.getItem('user') ? (
                            <>
                                <Button border leftIcon={<PlusIcon />}>
                                    <span>Tải lên</span>
                                </Button>
                                <Tippy content="Ứng dụng Tiktok cho máy tính" placement="bottom">
                                    <button className={cx('device-button')}>
                                        <DeviceIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Tin nhắn" placement="bottom">
                                    <button className={cx('action-button')}>
                                        <MessageIcon width={26} height={26} />
                                    </button>
                                </Tippy>
                                <Tippy content="Hộp thư" placement="bottom">
                                    <button className={cx('action-button')}>
                                        <MailIcon width={32} height={32} />
                                    </button>
                                </Tippy>
                                <Menu items={userMenu}>
                                    <Image src={user?.avatar} className={cx('user-avatar')} alt={user?.first_name} />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button border leftIcon={<PlusIcon />}>
                                    <span>Tải lên</span>
                                </Button>

                                <span className={cx('login_btn')}>
                                    <Button onClick={handleToggleModal} primary>
                                        <span>Đăng nhập</span>
                                    </Button>
                                </span>

                                <Tippy content="Ứng dụng Tiktok cho máy tính" placement="bottom">
                                    <button className={cx('device-button')}>
                                        <DeviceIcon />
                                    </button>
                                </Tippy>
                                <Menu items={MENU_ITEMS}>
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </button>
                                </Menu>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default memo(Header);
