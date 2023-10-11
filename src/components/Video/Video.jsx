import React, { forwardRef } from 'react';

function Video({ videoSrc }, ref) {
    return <video ref={ref} src={videoSrc} autoPlay={false} muted loop></video>;
}

export default forwardRef(Video);
