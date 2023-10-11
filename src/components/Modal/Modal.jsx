import React from 'react';

import { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';

import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Modal({ onShow, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <div className={cx('close-button')}>
                    <span onClick={onShow}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
                <div className={cx('body')}>{children}</div>
            </div>
        </div>
    );
}
export default memo(Modal);
