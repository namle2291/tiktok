import React, { useEffect, useRef, useState } from 'react';

import ReactPlayer from 'react-player';

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

import styles from './Video.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Video({ data }) {
    const [isPlaying, setIsPlaying] = useState(false);
    // const [mute, setMute] = useState(false);
    const [playTime, setPlayTime] = useState(0);

    const inputRef = useRef();

    const handleProgress = (state) => {
        setPlayTime(state.playedSeconds);
    };

    const formatTime = (time) => {
        const date = new Date(time * 1000);
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const second = ('0' + date.getUTCSeconds()).slice(-2);
        if (hour) {
            return `${hour}:${('0' + minute).slice(-2)}:${second}`;
        }
        return `${minute}:${second}`;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img
                    src={
                        data.user.avatar != 'https://files.fullstack.edu.vn/f8-tiktok/'
                            ? data.user.avatar
                            : 'https://yt3.googleusercontent.com/UsflU74uvka_3sejOu3LUGwzOhHJV0eIYoWcvOfkOre_c12uIN4ys-QqRlAkbusEmbZjTA-b=s900-c-k-c0x00ffffff-no-rj'
                    }
                    alt={data.user.nickname}
                />
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
                        <Button outline>
                            <span>Follow</span>
                        </Button>
                    </div>
                </div>
                <div className={cx('video')}>
                    <div className={cx('controls')}>
                        <div className={cx('header')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className={cx('file')}>
                            <ReactPlayer
                                width="100%"
                                playing={isPlaying}
                                onProgress={handleProgress}
                                url={data.file_url}
                            />
                        </div>
                        <div className={cx('footer')}>
                            <span onClick={() => setIsPlaying(!isPlaying)}>
                                {!isPlaying ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            </span>
                        </div>
                        <div className={cx('range')}>
                            <input
                                value={playTime}
                                min={0}
                                max={data.meta.playtime_seconds}
                                ref={inputRef}
                                type="range"
                                onChange={(e) => {}}
                            />
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
    );
}
