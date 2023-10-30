import Header from './Header/Header';
import React from 'react';

import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
