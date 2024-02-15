// components/Header.js

import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css'; // Import CSS module for styling

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src="/logo.png" // Path to your logo from the root directory
                    alt="Logo"
                    width={100} // Set the width of the logo
                    height={150} // Set the height of the logo
                />
            </div>
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Upload</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
