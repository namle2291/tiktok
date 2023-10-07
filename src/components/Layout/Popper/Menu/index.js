import React, { useState } from 'react';

import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Layout/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

export default function Menu({ children, items }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const menuList = (items) => {
        return current.data.map((e, index) => {
            const isParent = e.children ? true : false;
            const isSaparate = e.separate ? true : false;
            return (
                <MenuItem
                    key={index}
                    data={e}
                    isSaparate={isSaparate}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, e.children]);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            delay={[0, 700]}
            offset={[10, 5]}
            interactive={true}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {history.length > 1 && (
                            <Header
                                title="Ngôn ngữ"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {menuList(items)}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}
