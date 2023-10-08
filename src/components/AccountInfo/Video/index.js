import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Video({ video }) {
    return (
        <div className={ cx('wrapper') }>
            <div className={cx('header')}>
                <FontAwesomeIcon icon={faImage} />
            </div>
            <div className={cx('image')}>
                <img src={video.thumb_url} alt="" />
            </div>
            <div className={cx('footer')}>
                <span>
                    <FontAwesomeIcon icon={faPlay} />
                    <span className={cx('views')}>0</span>
                </span>
                <span>
                    <FontAwesomeIcon icon={faLock} />
                </span>
            </div>
        </div>
    );
}

export default Video;
