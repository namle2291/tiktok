import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button/Button';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
import BackToTop from '~/components/BackToTop/BackToTop';
const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <BackToTop />
            <Header />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content-wrapper')}>{children}</div>
            </div>
        </div>
    );
}
