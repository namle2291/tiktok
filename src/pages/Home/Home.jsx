import React, { useState } from 'react';
import { useEffect } from 'react';

import * as homeService from '~/services/homeService';

import Video from '~/components/Video/Video';

import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Home() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await homeService.getVideoList('for-you', 1);
            setVideos(result);
        };
        fetchAPI();
    }, []);

    return <div className={cx('wrapper')}>{videos && videos.map((vd) => <Video key={vd.id} data={vd} />)}</div>;
}
