import React, { createRef, useEffect, useRef, useState } from 'react';

import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
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

import styles from './Video.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Video({ data }) {
    const [isFollow, setIsFollow] = useState(data.user.is_followed);
    const [playing, setPlaying] = useState(false);

    const videoRef = createRef();

    const { token, auth } = useAuthContext();
    const navigate = useNavigate();

    const handleFollow = (id) => {
        if (token) {
            setIsFollow(!isFollow);
            const fetchAPI = async () => {
                await userService.followUser(id, !isFollow ? 'follow' : 'unfollow');
            };
            fetchAPI();
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (playing) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [playing]);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('image')}>
                    <Link to={`/@${data.user.nickname}`}>
                        <img
                            src={
                                data.user.avatar != 'https://files.fullstack.edu.vn/f8-tiktok/'
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
                            {data.user.id !== auth.id && (
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
                            <div className={cx('file')}>
                                <video controls ref={videoRef} autoPlay loop>
                                    <source type="video/mp4" src={data.file_url} />
                                </video>
                            </div>
                            <div className={cx('footer')}>
                                <span onClick={handlePlayPause}>
                                    {!playing ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                </span>
                            </div>
                            <div className={cx('range')}>
                                <input min={0} max={data.meta.playtime_seconds} type="range" onChange={(e) => {}} />
                                <span></span>
                            </div>
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
