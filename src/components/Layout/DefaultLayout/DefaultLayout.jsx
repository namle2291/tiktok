import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button/Button';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled >= 20) {
            setVisible(true);
        } else if (scrolled <= 0) {
            setVisible(false);
        }
    };

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {visible && (
                <Button onClick={handleBackToTop} rounded>
                    <FontAwesomeIcon icon={faArrowUp} />
                </Button>
            )}
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
