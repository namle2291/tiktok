import React from 'react'
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

export default function Account() {
  return (
    <div className={cx('wrapper')}>
        <img className={cx('avatar')} src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277561472_1583787875331078_4023961325792651065_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=sr1udX4Sj2oAX-AvVse&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9ed0dC4gntyKSk2HLe9JhAQL0fqbxk7wCv1sogyyRYpw&oe=62E5A7F4' alt='LSN'/>
        <div className={cx('info')}>
            <h4 className={cx('name')}>
                <span>NamLee</span>
                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
            </h4>
            <span className={cx('username')}>Lensko-LSN</span>
        </div>
    </div>
  )
}
