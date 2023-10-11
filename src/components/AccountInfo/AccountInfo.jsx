import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import * as userService from '~/services/userService';

import classNames from 'classnames/bind';
import styles from './AccountInfo.module.scss';
import Video from './Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '~/contexts/AuthProvider';
import { toast } from 'react-toastify';
import { EditIcon, UserActiveIcon } from '../Icons/Icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function AccountInfo({ data }) {
    const [isFollow, setIsFollow] = useState(data.is_followed);

    const { user } = useAuthContext();

    const handleFollow = (id) => {
        if (localStorage.getItem('user')) {
            setIsFollow(!isFollow);
            const fetchAPI = async () => {
                await userService.followUser(id, !isFollow ? 'follow' : 'unfollow');
            };
            fetchAPI();
        } else {
            toast.warn('Vui lòng đăng nhập!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('user-info')}>
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
                    <div className={cx('title')}>
                        <h1 className={cx('nick_name')}>{data.nickname}</h1>
                        <h4 className={cx('full_name')}>{data.first_name + ' ' + data.last_name}</h4>
                        {data.id !== user?.id && (
                            <>
                                {isFollow ? (
                                    <div className={cx('message-box')}>
                                        <span className={cx('message-button')}>
                                            <Button onClick={() => handleFollow(data.user.id)} outline>
                                                <span>Tin nhắn</span>
                                            </Button>
                                        </span>
                                        <Tippy animation="fade" placement="bottom" content="Bỏ follow">
                                            <span onClick={() => handleFollow(data.id)} className={cx('follow-icon')}>
                                                <span>
                                                    <UserActiveIcon />
                                                </span>
                                            </span>
                                        </Tippy>
                                    </div>
                                ) : (
                                    <span className={cx('follow-button')}>
                                        <Button onClick={() => handleFollow(data.id)} primary>
                                            <span>Follow</span>
                                        </Button>
                                    </span>
                                )}
                            </>
                        )}
                        {/* Is Login */}
                        {data.id === user?.id && (
                            <div className={cx('edit-button')}>
                                <Button
                                    border
                                    children="Sửa hồ sơ"
                                    leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                />
                            </div>
                        )}
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
