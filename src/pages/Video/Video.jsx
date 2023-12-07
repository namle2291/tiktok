import React from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

function Video() {
    const [data, setData] = useState({});

    const { infoVideoCurrent } = useSelector((state) => state.videoDetail);

    useLayoutEffect(() => {
        setData(infoVideoCurrent);
    }, []);

    return (
        <div className="flex h-[100vh]">
            <div className="w-[992px] border relative h-full overflow-hidden">
                <div className="flex justify-between items-center absolute top-0 left-0 right-0 h-[38px] border">
                    <div>x</div>
                    <div className="w-[30%] border">
                        <input type="text" />
                    </div>
                    <div>Report</div>
                </div>
                <div className="flex justify-center h-full">
                    <div
                        className={`border w-[${data.meta.video.resolution_x}px] h-[${data.meta.video.resolution_y}px]`}
                    >
                        <video className="h-full" autoPlay controls src={data.file_url}></video>
                    </div>
                </div>
                <div className="absolute flex flex-col justify-between right-0 bottom-0 border h-[400px]">
                    <div className="flex flex-col gap-4">
                        <button>Up</button>
                        <button>Down</button>
                    </div>
                    <div>Volume</div>
                </div>
            </div>
            <div className="flex-1 border">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, similique? Reiciendis optio illum
                assumenda ad quasi architecto distinctio voluptatem commodi, molestias cum tempora eaque error nulla?
                Laborum animi expedita itaque.
            </div>
        </div>
    );
}

export default Video;
