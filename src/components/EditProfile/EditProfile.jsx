import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useAuthContext } from '~/contexts/AuthProvider';
import { PenIcon } from '../Icons/Icons';
import * as userService from '~/services/userService';

import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
const cx = classNames.bind(styles);

export default function EditProfile({ onShow }) {
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [file, setFile] = useState({});
    const [avatar, setAvatar] = useState('');

    const { user } = useAuthContext();

    useEffect(() => {
        setBio(user?.bio);
        setFirstName(user?.first_name);
        setLastName(user?.last_name);
    }, []);

    const handleSave = () => {
        const fetchAPI = async () => {
            const payload = new FormData();
            payload.append('avatar', file);
            payload.append('first_name', firstName);
            payload.append('last_name', lastName);
            payload.append('bio', bio);
            const response = await userService.updateUser(payload);
            if (response) {
                localStorage.setItem('user', JSON.stringify(response));
                onShow();
                window.location.reload();
            }
        };
        fetchAPI();
    };

    const handleUpFile = (e) => {
        let file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setFile(file);
        setAvatar(url);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-line')}>
                <div className={cx('title')}>Ảnh hồ sơ</div>
                <div className={cx('edit-input')}>
                    <div className={cx('avatar')}>
                        <label htmlFor="file">
                            <img
                                src={
                                    user?.avatar !== process.env.REACT_APP_FILES_DEFAULT
                                        ? user?.avatar
                                        : process.env.REACT_APP_AVATAR_DEFAULT
                                }
                                alt={user?.nickname}
                            />
                            <span className={cx('edit-button')}>
                                <PenIcon />
                            </span>
                        </label>
                    </div>
                    <input onChange={handleUpFile} id="file" type="file" hidden />
                </div>
            </div>
            <div className={cx('content-line')}>
                <div className={cx('title')}>TikTok ID</div>
                <div className={cx('edit-input')}>
                    <input disabled value={user?.nickname} type="text" />
                    <p>www.tiktok.com/@{user?.nickname}</p>
                    <p>
                        TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi TikTok ID,
                        liên kết hồ sơ của bạn cũng sẽ thay đổi.
                    </p>
                </div>
            </div>
            <div className={cx('content-line')}>
                <div className={cx('title')}>First Name</div>
                <div className={cx('edit-input')}>
                    <input
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        value={firstName}
                        type="text"
                    />
                    <p>Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.</p>
                </div>
            </div>
            <div className={cx('content-line')}>
                <div className={cx('title')}>Last Name</div>
                <div className={cx('edit-input')}>
                    <input
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        value={lastName}
                        type="text"
                    />
                    <p>Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.</p>
                </div>
            </div>
            <div className={cx('content-line')}>
                <div className={cx('title')}>Tiểu sử</div>
                <div className={cx('edit-input')}>
                    <input
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                        value={bio}
                        type="text"
                    />
                    <p></p>
                </div>
            </div>
            <div className={cx('content-line')}>
                <div className={cx('actions')}>
                    <button onClick={onShow} className={cx('cancel-button')}>
                        Hủy
                    </button>
                    <button onClick={handleSave} className={cx('save-button')}>
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
