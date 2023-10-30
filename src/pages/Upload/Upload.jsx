import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import * as videoService from '~/services/videoService';

import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import phone from '~/assets/images/phone.png';

const cx = classNames.bind(styles);

const VIEWABLES = [
    {
        id: 1,
        value: 'private',
        title: 'Riêng tư',
    },
    {
        id: 2,
        value: 'public',
        title: 'Công khai',
    },
    {
        id: 3,
        value: 'friends',
        title: 'Bạn bè',
    },
];

export default function Upload() {
    const [file, setFile] = useState({});
    const [url, setUrl] = useState('');
    const [desc, setDesc] = useState('');
    const [viewable, setViewable] = useState('private');

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file.type === 'video/mp4') {
            setFile(file);
            const url = URL.createObjectURL(file);
            setUrl(url);
        } else {
            toast.warn('File phải là một video!');
        }
    };

    const handleUpload = () => {
        const payload = new FormData();
        payload.append('upload_file', file);
        payload.append('description', desc);
        payload.append('viewable', viewable);
        payload.append('allows[]', 'comment');
        payload.append('thumbnail_time', 1);

        if (file) {
            const fetchAPI = async () => {
                const response = await videoService.createVideo(payload);
                console.log(response);
            };
            fetchAPI();
        }
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [url]);

    return (
        <div className={cx('wrapper')}>
            <div>
                <label htmlFor="file">
                    <div className={cx('upload')}>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            style={{ width: '48px', height: '48px' }}
                        >
                            <path d="M25.84 37h8.66a9.5 9.5 0 0 0 1.35-18.9A12 12 0 0 0 12 20v.01A8.5 8.5 0 0 0 12.5 37h10.34V25.6l-1.72 1.74a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 0-1.41l4.4-4.4c.68-.76 1.22-.77 2 .08l4.28 4.32a1 1 0 0 1 0 1.4l-.7.72a1 1 0 0 1-1.42 0l-1.72-1.75V37Z"></path>
                        </svg>
                        <h3>Chọn video để tải lên</h3>
                        <div>Hoặc kéo và thả tập tin</div>
                        <div>MP4 hoặc WebM</div>
                        <div>Độ phân giải 720x1280 trở lên</div>
                        <div>Tối đa 10 phút</div>
                        <div>Nhỏ hơn 10 GB</div>
                        <label htmlFor="file" className={cx('button-select')}>
                            Chọn tập tin
                        </label>
                    </div>
                </label>
                <input id="file" onChange={handleChangeFile} type="file" hidden />
            </div>
            <div className={cx('preview')}>
                <div className={cx('phone')}>
                    <img src={phone} alt="" />
                    {url && <video src={url} controls></video>}
                </div>
                <div className={cx('info')}>
                    <div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Mô tả</label>
                            <input
                                onChange={(e) => setDesc(e.target.value)}
                                className={cx('form-control')}
                                type="email"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Ai có thể xem video này</label>
                            <select onChange={(e) => setViewable(e.target.value)} className={cx('form-select')}>
                                {VIEWABLES.map((item) => (
                                    <option selected={viewable === item.value} value={item.value}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Cho phép người dùng:</label>
                            {/* {allows.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <input
                                            checked={checked === item.id}
                                            value={checkName}
                                            onChange={() => handleCheck(item.title)}
                                            className={cx('form-check')}
                                            type="checkbox"
                                        />
                                        {item.title}
                                    </div>
                                );
                            })} */}
                        </div>
                        <div className={cx('form-group')}>
                            <button onClick={handleUpload} className={cx('upload-button')}>
                                Đăng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
