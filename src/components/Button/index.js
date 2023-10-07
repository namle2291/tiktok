import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

export default function Button({
    normal = null,
    primary = null,
    rounded = null,
    small = null,
    border = null,
    large = null,
    to = null,
    href = null,
    children = null,
    onClick = null,
    leftIcon = null,
    rightIcon = null,
    className = null,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('wrapper', { normal, border, primary, rounded, small, large }, className);
    let props = {
        to,
        href,
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
        </Comp>
    );
}
