import React, { useEffect, useState } from 'react';

import AccountSuggest from '~/components/AccountSuggest/AccountSuggest';
import Loading from '~/components/Loading/Loading';
import Recomend from '~/components/Recomend/Recomend';

import * as userServices from '~/services/userService';
import * as homeService from '~/services/homeService';

import styles from './Following.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Following() {
    const [userSuggested, setUserSuggested] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem('user')) {
            const fetchAPI = async () => {
                const result = await userServices.getUserSuggested(1, 10);
                setUserSuggested(result);
                setLoading(false);
            };
            fetchAPI();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('user')) {
            const fetchAPI = async () => {
                const result = await homeService.getVideoList('following', 1);
                setLoading(false);
                setVideos(result);
            };
            fetchAPI();
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            {localStorage.getItem('user') ? (
                <div className={cx('wrapper-following')}>
                    {videos && videos.map((vd) => <Recomend key={vd.id} data={vd} />)}
                </div>
            ) : (
                <div className={cx('wrapper-suggesst')}>
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
            )}
        </div>
    );
}
