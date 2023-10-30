import React from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button/Button';
import { useAuthContext } from '~/contexts/AuthProvider';
const cx = classNames.bind(styles);

export default function MenuItem({ data, onClick, isSaparate, isUser }) {
    const { user } = useAuthContext();
    return (
        <Button
            className={cx('menu-item', { saparate: isSaparate })}
            leftIcon={data.icon}
            to={isUser ? data.to + user?.nickname : data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}
