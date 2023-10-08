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
                        <img src={data.avatar} alt="" />
                    </div>
                    <div className={cx('fullname')}>{data.first_name + ' ' + data.last_name} </div>
                    <div className={cx('nickname')}>{data.nickname}</div>
                    <Button primary>Follow</Button>
                </div>
            </div>
        </div>
    );
}

export default AccountSuggest;
