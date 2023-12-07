import React, { useState } from 'react';

import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import {
    faBookmark,
    faCommentDots,
    faEllipsis,
    faHeart,
    faMusic,
    faPause,
    faPlay,
    faShare,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuthContext } from '~/contexts/AuthProvider';
import * as userService from '~/services/userService';

import styles from './Recomend.module.scss';
import classNames from 'classnames/bind';
import { useVideoAutoPlayback } from '~/hooks/useVideoAutoPlayback';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying, setVolume } from '~/features/settingPlayFeature';
const cx = classNames.bind(styles);

export default function Recomend({ data }) {
    const [isFollow, setIsFollow] = useState(data.user.is_followed);

    const [containerRef, videoRef] = useVideoAutoPlayback({
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    });

    const { volume, playing } = useSelector((state) => state.setting);

    const { user } = useAuthContext();
    const dispatch = useDispatch();

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
        <>
            <div className={cx('wrapper')} ref={containerRef}>
                <div className={cx('image')}>
                    <Link to={`/@${data.user.nickname}`}>
                        <img
                            src={
                                data.user.avatar !== process.env.REACT_APP_FILES_DEFAULT
                                    ? data.user.avatar
                                    : 'https://yt3.googleusercontent.com/UsflU74uvka_3sejOu3LUGwzOhHJV0eIYoWcvOfkOre_c12uIN4ys-QqRlAkbusEmbZjTA-b=s900-c-k-c0x00ffffff-no-rj'
                            }
                            alt={data.user.nickname}
                        />
                    </Link>
                </div>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <div>
                            <Link to={`/@${data.user.nickname}`} className={cx('nickname')}>
                                {data.user.nickname}
                            </Link>
                            <span className={cx('fullname')}>{data.user.first_name + ' ' + data.user.last_name}</span>
                            <p className={cx('description')}>{data.description}</p>
                            <p className={cx('music')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faMusic} />
                                </span>
                                <Link to="/" className={cx('name')}>
                                    nhạc nền - {data.music}
                                </Link>
                            </p>
                        </div>
                        <div className={cx('follow_btn')}>
                            {data.user.id !== user?.id && (
                                <>
                                    {isFollow ? (
                                        <Button
                                            className={cx('link')}
                                            onClick={() => handleFollow(data.user.id)}
                                            border
                                        >
                                            <span>Đang Follow</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            className={cx('link')}
                                            onClick={() => handleFollow(data.user.id)}
                                            outline
                                        >
                                            <span>Follow</span>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className={cx('video')}>
                        <div className={cx('controls')}>
                            <div className={cx('header')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                            <div
                                // to={`/@${data.user.nickname}/video/${data.uuid}`}
                                className={cx('file', 'cursor-pointer')}
                            >
                                <video controls ref={videoRef} src={data.file_url} muted loop></video>
                            </div>
                            {/* <div className={cx('footer')}>
                                <span onClick={() => dispatch(setPlaying(!playing))}>
                                    {!playing ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
                                </span>
                                <span className={cx('volume')}>
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                    <input
                                        min={0}
                                        max={100}
                                        // value={volume}
                                        onChange={(e) => dispatch(setVolume(e.target.value / 100))}
                                        className={cx('volume-progress')}
                                        type="range"
                                    />
                                </span>
                            </div> */}
                        </div>
                        <div className={cx('actions')}>
                            <div className={cx('likes')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <strong>{data.likes_count}</strong>
                            </div>
                            <div className={cx('comments')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCommentDots} />
                                </div>
                                <strong>{data.comments_count}</strong>
                            </div>
                            <div className={cx('saves')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                                <strong>{data.likes_count}</strong>
                            </div>
                            <div className={cx('shared')}>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faShare} />
                                </div>
                                <strong>{data.shares_count}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
