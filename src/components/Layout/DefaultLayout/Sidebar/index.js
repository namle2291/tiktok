import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faHouse, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);

export default function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Link to="/">
                <Button normal children="Dành cho bạn" leftIcon={<FontAwesomeIcon icon={faHouse} />} />
            </Link>
            <Link to="/following">
                <Button normal children="Đang Follow" leftIcon={<FontAwesomeIcon icon={faUserGroup} />} />
            </Link>
            <Link to="/">
                <Button normal children="Khám phá" leftIcon={<FontAwesomeIcon icon={faCompass} />} />
            </Link>
            <Link to="/">
                <Button normal children="LIVE" leftIcon={<FontAwesomeIcon icon={faVideo} />} />
            </Link>
        </aside>
    );
}
