import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying } from '~/features/settingPlayFeature';

const useVideoAutoPlayback = (options) => {
    const containerRef = useRef();
    const videoRef = useRef();

    const { playing } = useSelector((state) => state.setting);

    const callback = (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
            videoRef.current.play();
        } else if (!entry.isIntersecting) {
            videoRef.current.pause();
        }
    };

    useEffect(() => {
        let observer = new IntersectionObserver(callback, options);

        let container = containerRef.current;

        if (container) observer.observe(container);

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    }, [containerRef, options]);

    return [containerRef, videoRef];
};

export { useVideoAutoPlayback };
