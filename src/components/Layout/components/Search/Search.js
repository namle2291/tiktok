import React, { useState } from 'react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Account from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '../../Popper';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    return (
        <>
            <Tippy
                visible={searchResult.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tài khoản</h4>
                            <Account />
                            <Account />
                            <Account />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm tài khoản và video" />

                    {searchValue && (
                        <button
                            onClick={() => {
                                setSearchValue('');
                            }}
                            className={cx('clear')}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    )}
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </Tippy>
        </>
    );
}
