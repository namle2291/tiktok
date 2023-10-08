import React, { useEffect, useRef, useState } from 'react';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Account from '~/components/AccountItem/Account';
import { Wrapper as PopperWrapper } from '../../Popper';
import * as searchService from '~/services/searchService';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '@uidotdev/usehooks';
import { SearchIcon } from '~/components/Icons/Icons';
const cx = classNames.bind(styles);

export default function Search() {
    // State
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 300);
    // Ref
    const inputRef = useRef(null);
    // Hooks
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchAPI = async () => {
            setLoading(true);
            const response = await searchService.getUserSearch(debouncedValue);
            setSearchResult(response);
            setLoading(false);
        };

        fetchAPI();
    }, [debouncedValue]);

    // Functions
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tài khoản</h4>
                            {searchResult.map((result) => (
                                <Account key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('wrapper')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </>
    );
}
