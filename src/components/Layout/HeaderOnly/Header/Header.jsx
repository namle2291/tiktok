import React from 'react';

import { Link } from 'react-router-dom';
import { TiktokIcon } from '~/components/Icons/Icons';
import { useAuthContext } from '~/contexts/AuthProvider';
import Image from '~/components/Images';
import { faBackward, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../../Popper/Menu/Menu';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const MENU_USERS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/@',
        isUser: true,
    },
    {
        icon: <FontAwesomeIcon icon={faBackward} />,
        title: 'Đăng xuất',
        to: '/logout',
    },
];

export default function Header() {
    const { user } = useAuthContext();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to="/" className={cx('logo')}>
                    <TiktokIcon />
                </Link>
                <div className={cx('user')}>
                    <Menu items={MENU_USERS}>
                        <Image
                            src={
                                user?.avatar !== process.env.REACT_APP_FILES_DEFAULT
                                    ? user?.avatar
                                    : process.env.REACT_APP_AVATAR_DEFAULT
                            }
                            className={cx('user-avatar')}
                            alt={user?.first_name}
                        />
                    </Menu>
                </div>
            </div>
        </div>
    );
}
