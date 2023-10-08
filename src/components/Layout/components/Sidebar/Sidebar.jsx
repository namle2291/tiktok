import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faHouse, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button/Button';
import { HomeIcon, UsersIcon, CompassIcon, CameraIcon } from '~/components/Icons/Icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
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

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className={cx('wrapper')}>
            {menus.map((m, index) => {
                let Icon = m.icon;
                let type = m.type;
                return (
                    <Link key={index} to={m.to}>
                        <Button normal className={cx(location.pathname == m.to ? 'active' : '')} leftIcon={<Icon />}>
                            {m.title}
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
}
