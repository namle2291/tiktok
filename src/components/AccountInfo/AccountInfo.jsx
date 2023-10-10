import React from 'react';
import Button from '~/components/Button/Button';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';
import styles from './AccountInfo.module.scss';
import Video from './Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountInfo({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('user-info')}>
                    <div className={cx('avatar')}>
                        <img
                            src={
                                data.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                                    ? data.avatar
                                    : 'https://yt3.googleusercontent.com/UsflU74uvka_3sejOu3LUGwzOhHJV0eIYoWcvOfkOre_c12uIN4ys-QqRlAkbusEmbZjTA-b=s900-c-k-c0x00ffffff-no-rj'
                            }
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <h1 className={cx('nick_name')}>{data.nickname}</h1>
                        <h4 className={cx('full_name')}>{data.first_name + ' ' + data.last_name}</h4>
                        <Button className={cx('follow_btn')} primary>
                            Follow
                        </Button>
                        {/* Is Login */}
                        {/* <Button
                            className={cx('edit_btn')}
                            border
                            children="Sửa hồ sơ"
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        /> */}
                    </div>
                </div>
                <h3 className={cx('count_info')}>
                    <div className={cx('number')}>
                        <strong>{data.followings_count}</strong>
                        <span>Đang follow</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{data.followers_count}</strong>
                        <span>Đang follower</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{data.likes_count}</strong>
                        <span>Thích</span>
                    </div>
                </h3>
                <p className={cx('data_bio')}>{data.bio}</p>
            </div>
            <div className={cx('tabs')}>
                <Button tab className={cx('active')}>
                    Video
                </Button>
                {/* Is Login */}
                {/* <Button tab leftIcon={<FontAwesomeIcon icon={faLock} />}>
                    Yêu thích
                </Button> */}
                <Button tab leftIcon={<FontAwesomeIcon icon={faLock} />}>
                    Đã thích
                </Button>
            </div>
            <div className={cx('videos-container')}>
                {data.videos &&
                    data.videos.map((vd) => {
                        return <Video key={vd.id} video={vd} />;
                    })}
            </div>
        </div>
    );
}

export default AccountInfo;
