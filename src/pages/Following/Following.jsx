import React, { useEffect, useState } from 'react';

import AccountSuggest from '~/components/AccountSuggest/AccountSuggest';
import * as userServices from '~/services/userService';

import styles from './Following.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Following() {
    const [userSuggested, setUserSuggested] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await userServices.getUserSuggested(1, 10);
            setUserSuggested(result);
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid wide')}>
                <div className={cx('row no-gutters')}>
                    {userSuggested.map((user) => (
                        <div key={user.id} className={cx('c-4')}>
                            <AccountSuggest data={user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
