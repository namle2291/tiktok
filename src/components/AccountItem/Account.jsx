import React from 'react';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Account({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={
                    data.avatar !== process.env.REACT_APP_FILES_DEFAULT
                        ? data.avatar
                        : process.env.REACT_APP_AVATAR_DEFAULT
                }
                alt={data.full_name}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.nickname}
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <p className={cx('username')}>{data.first_name + ' ' + data.last_name}</p>
            </div>
        </Link>
    );
}

export default Account;
