import React from 'react'
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

export default function Account() {
  return (
      <div className={cx('wrapper')}>
          <img
              className={cx('avatar')}
              src="https://static.vecteezy.com/system/resources/previews/009/122/855/original/lsn-logo-lsn-letter-lsn-letter-logo-design-initials-lsn-logo-linked-with-circle-and-uppercase-monogram-logo-lsn-typography-for-technology-business-and-real-estate-brand-vector.jpg"
              alt="LSN"
          />
          <div className={cx('info')}>
              <h4 className={cx('name')}>
                  <span>LSN</span>
                  <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
              </h4>
              <span className={cx('username')}>Lensko-LSN</span>
          </div>
      </div>
  );
}
