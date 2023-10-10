import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountInfo from '~/components/AccountInfo/AccountInfo';

import * as userService from '~/services/userService';

import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Profile() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const { nickname } = useParams();

    useEffect(() => {
        if (nickname) {
            setLoading(true);
            const fetchAPI = async () => {
                const data = await userService.getUserInfo(nickname);
                setLoading(false);
                setUser(data);
            };
            fetchAPI();
        }
    }, []);

    return (
        <>
            {!loading && (
                <div className={cx('wrapper')}>
                    <AccountInfo data={user} />
                </div>
            )}
        </>
    );
}
