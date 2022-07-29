import React from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

export default function MenuItem({ data, onClick, isSaparate }) {
    return (
        <Button
            className={cx('menu-item', { saparate: isSaparate })}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}
