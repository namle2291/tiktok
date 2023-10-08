import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
    normal,
    primary,
    rounded,
    tab,
    active,
    small,
    border,
    outline,
    large,
    to,
    href,
    children,
    onClick,
    leftIcon,
    rightIcon,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('wrapper', { normal, outline, tab, active, border, primary, rounded, small, large }, className);
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
        <>
            <Comp className={classes} {...props}>
                {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
            </Comp>
        </>
    );
}
export default Button;
