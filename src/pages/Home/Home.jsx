import React, { useState } from 'react';
import { useEffect } from 'react';

import Recomend from '~/components/Recomend/Recomend';
import Loading from '~/components/Loading/Loading';

import * as homeService from '~/services/homeService';

import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
const cx = classNames.bind(styles);

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasmore, setHasMore] = useState(false);

    const fetchAPI = async () => {
        setLoading(true);
        const result = await homeService.getVideoList('for-you', page);
        setLoading(false);

        if (result.length > 0) {
            setVideos((prev) => [...prev, ...result]);
            setHasMore(true);
            setPage(page + 1);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={videos.length}
                scrollableTarget="wrapper"
                next={fetchAPI}
                hasMore={hasmore}
                loader={<Loading />}
            >
                {videos && videos.map((vd) => <Recomend key={vd.id} data={vd} />)}
            </InfiniteScroll>
        </div>
    );
}
