import React from 'react';

import styles from './AccountSuggest.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
const cx = classNames.bind(styles);

function AccountSuggest({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card')}>
                <div className={cx('thumbnail')}>
                    <img src={data.popular_video.thumb_url} alt="" />
                </div>
                <div className={cx('video_preview')}></div>
                <div className={cx('content')}>
                    <div className={cx('avatar')}>
                        <img
                            src={
                                data.avatar !== process.env.REACT_APP_FILES_DEFAULT
                                    ? data.avatar
                                    : 'https://yt3.googleusercontent.com/UsflU74uvka_3sejOu3LUGwzOhHJV0eIYoWcvOfkOre_c12uIN4ys-QqRlAkbusEmbZjTA-b=s900-c-k-c0x00ffffff-no-rj'
                            }
                            alt=""
                        />
                    </div>
                    <div className={cx('fullname')}>
                        {data.first_name || data?.last_name !== ''
                            ? data.first_name + ' ' + data.last_name
                            : 'tiktok-user'}{' '}
                    </div>
                    <div className={cx('nickname')}>{data.nickname ?? 'user'}</div>
                    <Button primary>Follow</Button>
                </div>
            </div>
        </div>
    );
}

export default AccountSuggest;
