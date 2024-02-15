// components/Banner.js

import React from 'react';
import styles from './Banner.module.css'; // Import CSS module for styling
import Link from 'next/link';

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.leftSection}>
                <div className={styles.imageContainer}>
                    <img src="/path/to/your/image.jpg" alt="Your Image" />
                </div>
                <div className={styles.textSection}>
                    <h3>Telegram Update</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum tortor sed orci efficitur, nec efficitur nulla congue.</p>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h1>Unlock Your Earnings Turn Your Shared Videos into Revenue Streams</h1>
                <h3 className={styles.headingslogan}>Fast, Easy And Secure.</h3>
                <div className={styles.buttonsContainer}>
                    <Link href="/UploadForm" legacyBehavior>
                        <a className={styles.button}>Upload</a>
                    </Link>
                    <Link href="/components/UploadForm" legacyBehavior>
                        <a className={styles.buttonsec}>Upload Via T</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
