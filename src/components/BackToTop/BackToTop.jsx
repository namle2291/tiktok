import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    const handleScroll = useCallback(() => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled >= 20) {
            setVisible(true);
        } else if (scrolled <= 0) {
            setVisible(false);
        }
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {visible && (
                <Button onClick={handleBackToTop} rounded>
                    <FontAwesomeIcon icon={faArrowUp} />
                </Button>
            )}
        </>
    );
}
