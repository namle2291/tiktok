import React from 'react';

import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Loading() {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('tiktok')}></div>
                <div className={cx('tiktok', 'red')}></div>
            </div>
        </>
    );
}
